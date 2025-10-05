import React from 'react';
import { GeneratedImage } from '../types';

interface GeneratedImageDisplayProps {
  originalImageUrl: string;
  generatedImage: GeneratedImage;
}

interface ImageCardProps {
    imageUrl: string;
    title: string;
    onDownload?: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ imageUrl, title, onDownload }) => (
    <div className="flex flex-col space-y-2 bg-base-200 p-4 rounded-lg shadow-md w-full">
        <div className="w-full flex justify-between items-center">
            <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
            {onDownload && (
                <button
                    onClick={onDownload}
                    className="p-2 rounded-full text-text-secondary hover:bg-base-300 hover:text-text-primary transition-colors"
                    aria-label="画像をダウンロード"
                    title="画像をダウンロード"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </button>
            )}
        </div>
        <div className="aspect-square w-full rounded-lg overflow-hidden">
             <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
        </div>
    </div>
);


const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ originalImageUrl, generatedImage }) => {
  
  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage.url;

    const mimeType = generatedImage.url.match(/data:(.*);base64,/)?.[1] ?? 'image/png';
    const extension = mimeType.split('/')[1] ?? 'png';
    link.download = `toy-styled-image.${extension}`;
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageCard imageUrl={originalImageUrl} title="元の画像" />
            <ImageCard imageUrl={generatedImage.url} title="おもちゃバージョン" onDownload={handleDownload} />
        </div>
        {generatedImage.text && (
             <div className="bg-base-200 p-4 rounded-lg shadow-md">
                <p className="text-text-secondary italic">{generatedImage.text}</p>
            </div>
        )}
    </div>
  );
};

export default GeneratedImageDisplay;