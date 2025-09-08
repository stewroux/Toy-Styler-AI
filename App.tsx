import React, { useState, useCallback } from 'react';
import { GeneratedImage } from './types';
import { editImage } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import LoadingSpinner from './components/LoadingSpinner';
import GeneratedImageDisplay from './components/GeneratedImageDisplay';

const App: React.FC = () => {
  const [originalImageFile, setOriginalImageFile] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [subjectDescription, setSubjectDescription] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    setOriginalImageFile(file);
    setGeneratedImage(null);
    setError(null);
    const url = URL.createObjectURL(file);
    setOriginalImageUrl(url);
    // Revoke previous URL to prevent memory leaks
    return () => URL.revokeObjectURL(url);
  }, []);

  const handleGenerateClick = async () => {
    if (!originalImageFile) {
      setError('まず画像をアップロードしてください。');
      return;
    }
    if (!subjectDescription.trim()) {
      setError('写真の主題を説明してください。');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const result = await editImage(originalImageFile, subjectDescription);
      setGeneratedImage(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '予期せぬエラーが発生しました。';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setOriginalImageFile(null);
    setOriginalImageUrl(null);
    setSubjectDescription('');
    setGeneratedImage(null);
    setError(null);
    setIsLoading(false);
  }

  const isButtonDisabled = isLoading || !originalImageFile || !subjectDescription.trim();

  return (
    <div className="min-h-screen bg-base-100 text-text-primary font-sans">
      <main className="container mx-auto px-4 py-8 max-w-4xl space-y-8">
        <Header />

        <div className="bg-base-200/50 p-6 rounded-lg shadow-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <ImageUploader onImageUpload={handleImageUpload} previewUrl={originalImageUrl} />
            <div className="space-y-4">
              <label htmlFor="description" className="block text-sm font-medium text-text-secondary">
                1. 主題が明確な画像をアップロードしてください。
              </label>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-text-secondary mb-2">
                  2. 主題を簡単に説明してください（例：「微笑む宇宙飛行士」、「鎧を着た騎士」）。
                </label>
                <input
                  id="description"
                  type="text"
                  value={subjectDescription}
                  onChange={(e) => setSubjectDescription(e.target.value)}
                  placeholder="例：赤いマントのスーパーヒーロー"
                  className="w-full px-3 py-2 bg-base-300 border border-base-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleGenerateClick}
                disabled={isButtonDisabled}
                className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? '生成中...' : 'おもちゃを作成'}
              </button>
               {(generatedImage || originalImageFile) && !isLoading && (
                 <button 
                   onClick={handleReset}
                   className="w-full sm:w-auto px-8 py-3 text-lg font-semibold text-text-secondary bg-base-300 rounded-lg shadow-lg transition-colors hover:bg-base-300/80"
                 >
                   やり直す
                 </button>
               )}
          </div>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative text-center" role="alert">
            <strong className="font-bold">エラー: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center p-6 bg-base-200/50 rounded-lg shadow-lg">
              <LoadingSpinner />
          </div>
        )}
        
        {generatedImage && originalImageUrl && !isLoading && (
            <GeneratedImageDisplay originalImageUrl={originalImageUrl} generatedImage={generatedImage} />
        )}

      </main>
    </div>
  );
};

export default App;