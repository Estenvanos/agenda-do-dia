#!/usr/bin/env sh
set -eu
cd "$(dirname "$0")"
if [ ! -d node_modules ]; then
  echo "Instalando dependências..."
  npm install
fi
npm run dev -- --open
