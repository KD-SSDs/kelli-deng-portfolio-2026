#!/bin/zsh
set -euo pipefail

portfolio_root="$(cd "$(dirname "$0")" && pwd)"
cd "$portfolio_root"

portfolio_port="${PORTFOLIO_PORT:-3000}"
node_bin="$(command -v node || true)"
codex_node="$HOME/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node"

if [[ -z "$node_bin" && -x "$codex_node" ]]; then
  node_bin="$codex_node"
fi

if [[ -z "$node_bin" ]]; then
  print "Node.js 22 or newer is required. Install Node.js, then run this file again."
  read -k 1 "?Press any key to close."
  exit 1
fi

if [[ ! -f "node_modules/vinext/dist/cli.js" ]]; then
  print "Portfolio dependencies are missing. Run pnpm install in this folder first."
  read -k 1 "?Press any key to close."
  exit 1
fi

print "Starting kelli deng portfolio 2026"
print "Open http://127.0.0.1:${portfolio_port}"
print "Keep this window open. Press Control-C to stop the server."
print ""

export WRANGLER_LOG_PATH="$portfolio_root/.wrangler/wrangler.log"
exec "$node_bin" "$portfolio_root/node_modules/vinext/dist/cli.js" dev --host 127.0.0.1 --port "$portfolio_port"
