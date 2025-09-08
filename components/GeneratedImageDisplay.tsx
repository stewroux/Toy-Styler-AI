import React from 'react';
import { GeneratedImage } from '../types';

interface GeneratedImageDisplayProps {
  originalImageUrl: string;
  generatedImage: GeneratedImage;
}

const ImageCard: React.FC<{ imageUrl: string; title: string }> = ({ imageUrl, title }) => (
    <div className="flex flex-col items-center space-y-2 bg-base-200 p-4 rounded-lg shadow-md w-full">
        <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
        <div className="aspect-square w-full rounded-lg overflow-hidden">
             <img src={imageUrl} alt={title} className="w-full h-full object-contain" />
        </div>
    </div>
);


const GeneratedImageDisplay: React.FC<GeneratedImageDisplayProps> = ({ originalImageUrl, generatedImage }) => {
  return (
    <div className="w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageCard imageUrl={originalImageUrl} title="元の画像" />
            <ImageCard imageUrl={generatedImage.url} title="おもちゃバージョン" />
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