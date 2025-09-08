import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center p-6 bg-base-200/50 rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-light">
          Toy Styler AI
        </h1>
        <p className="mt-2 text-lg text-text-secondary">
          どんな写真も、カスタムボックス付きの素敵なコレクターフィギュアに変身させます。
        </p>
    </header>
  );
};

export default Header;