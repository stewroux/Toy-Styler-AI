#!/bin/bash
set -euo pipefail

# Claude Code on the web (remote) のみで実行
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

echo "[session-start] Installing dependencies..."
npm install

echo "[session-start] Dependencies installed successfully."
