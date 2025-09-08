import { GoogleGenAI, Modality } from "@google/genai";
import { fileToBase64 } from '../utils/imageUtils';
import { GeneratedImage } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


export const editImage = async (imageFile: File, subjectDescription: string): Promise<GeneratedImage> => {
  try {
    const base64ImageData = await fileToBase64(imageFile);

    const prompt = `Based on the provided image, transform the main subject (${subjectDescription}) into a high-quality, detailed, photorealistic toy-like collectible statuette. The statuette should be posed dynamically on a simple, elegant stand.

    Behind the statuette, create a branded toy box that looks like official merchandise. The box art must feature a cool, stylized illustration of the character from the image. The character's name or title, derived from the description "${subjectDescription}", should be prominently displayed on the box in a modern, stylish font.
    
    The overall composition should be clean and professional, resembling a promotional shot for a premium collectible figure. The lighting should be dramatic, highlighting the details of the statuette.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: imageFile.type,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    if (!response.candidates || response.candidates.length === 0) {
      throw new Error("APIから応答がありませんでした。");
    }
    
    let imageUrl: string | null = null;
    let text = "画像が正常に生成されました。";

    for (const part of response.candidates[0].content.parts) {
      if (part.text) {
        text = part.text;
      } else if (part.inlineData) {
        const base64ImageBytes: string = part.inlineData.data;
        imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
      }
    }

    if (!imageUrl) {
        throw new Error("APIの応答に画像が含まれていませんでした。モデルがリクエストを拒否した可能性があります。");
    }

    return { url: imageUrl, text };

  } catch (error) {
    console.error("Error editing image with Gemini API:", error);
    if (error instanceof Error) {
        return Promise.reject(new Error(`画像の生成に失敗しました: ${error.message}`));
    }
    return Promise.reject(new Error("画像の生成中に不明なエラーが発生しました。"));
  }
};