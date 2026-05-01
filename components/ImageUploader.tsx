import React, { useState, useCallback } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  previewUrl: string | null;
}

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const validateFile = (file: File): string | null => {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return `ファイルサイズは${MAX_FILE_SIZE_MB}MB以下にしてください（現在: ${(file.size / 1024 / 1024).toFixed(1)}MB）。`;
  }
  return null;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, previewUrl }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const error = validateFile(file);
      if (error) {
        setFileError(error);
        return;
      }
      setFileError(null);
      onImageUpload(file);
    }
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const error = validateFile(file);
      if (error) {
        setFileError(error);
        return;
      }
      setFileError(null);
      onImageUpload(file);
    }
  }, [onImageUpload]);

  return (
    <div className="w-full">
      <label
        htmlFor="image-upload"
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-brand-primary bg-base-200' : 'border-base-300 hover:border-brand-secondary hover:bg-base-200'}`}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="プレビュー" className="object-contain h-full w-full rounded-lg p-2" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-text-secondary">
             <svg className="w-10 h-10 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="mb-2 text-sm"><span className="font-semibold">クリックしてアップロード</span>またはドラッグ＆ドロップ</p>
            <p className="text-xs">PNG, JPG, または WEBP（最大{MAX_FILE_SIZE_MB}MB）</p>
          </div>
        )}
        <input id="image-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleFileChange} />
      </label>
      {fileError && (
        <p className="mt-2 text-sm text-red-400">{fileError}</p>
      )}
    </div>
  );
};

export default ImageUploader;
