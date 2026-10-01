#!/usr/bin/env bash
# Build the public site from the vault with Quartz.
#
#   .site/build.sh            one-off build into .site/.quartz/public
#   .site/build.sh --serve    live preview at http://localhost:8080
#
# Extra arguments are passed straight to `quartz build`.
set -euo pipefail

QUARTZ_VERSION="v4.5.2"

SITE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VAULT="$(dirname "$SITE")"
QUARTZ="$SITE/.quartz"

# Vault folders that are published. Anything not listed here never reaches the site.
PUBLISH=(entries _prompts _attachments)

# Fetch Quartz once per pinned version.
if [ "$(cat "$QUARTZ/.pinned-version" 2>/dev/null || true)" != "$QUARTZ_VERSION" ]; then
  rm -rf "$QUARTZ"
  git clone --quiet --depth 1 --branch "$QUARTZ_VERSION" \
    -c advice.detachedHead=false https://github.com/jackyzha0/quartz "$QUARTZ"
  (cd "$QUARTZ" && npm ci --no-audit --no-fund)
  echo "$QUARTZ_VERSION" > "$QUARTZ/.pinned-version"
fi

# Overlay our config, layout and components.
cp "$SITE/quartz.config.ts" "$SITE/quartz.layout.ts" "$QUARTZ/"
cp "$SITE"/components/*.tsx "$QUARTZ/quartz/components/"

# Assemble the content folder from the allowlist.
rm -rf "$QUARTZ/content"
mkdir -p "$QUARTZ/content"
for dir in "${PUBLISH[@]}"; do
  if [ -d "$VAULT/$dir" ]; then
    cp -a "$VAULT/$dir" "$QUARTZ/content/"
  fi
done
find "$QUARTZ/content" -name .gitkeep -delete
cp "$SITE/home.md" "$QUARTZ/content/index.md"

cd "$QUARTZ"
npx quartz build "$@"
