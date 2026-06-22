# Toy Styler AI

Restyle toy photos with AI, built with React + Vite and the Google Gemini API.

## Requirements

- **Node.js** >= 20
- A **Google Gemini API key** — get one at <https://aistudio.google.com/apikey>

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure your API key:

   ```bash
   cp .env.example .env.local
   # then edit .env.local and set GEMINI_API_KEY
   ```

## Run

```bash
npm run dev
```

The app starts a local Vite dev server (default <http://localhost:3000>).

## License

This project is licensed under the MIT License — see [LICENSE](./LICENSE).
