#!/bin/sh
set -e

echo "=== Installing components from components-config.json ==="

if [ ! -f "components-config.json" ]; then
  echo "⚠️ components-config.json not found, skipping component installation"
  exit 0
fi

echo "Found components-config.json, reading configuration..."

# Install bulk components if enabled
BULK_ENABLED=$(node -p "require('./components-config.json').bulkInstall?.enabled !== false")
if [ "$BULK_ENABLED" = "true" ]; then
  BULK_URL=$(node -p "require('./components-config.json').bulkInstall?.url || ''")
  if [ -n "$BULK_URL" ] && [ "$BULK_URL" != "undefined" ]; then
    echo ""
    echo "Installing bulk components from: $BULK_URL"
    echo "Using --overwrite --yes flags..."
    pnpm dlx shadcn@latest add "$BULK_URL" --yes --overwrite || true
    echo "✅ Bulk component installation completed"
  fi
else
  echo "Bulk installation is disabled, skipping..."
fi

# Install all additional components
echo ""
echo "Installing all additional components from components-config.json..."
echo "Using --overwrite --yes flags for all components..."
node -e "
  const config = require('./components-config.json');
  if (config.additionalComponents && Array.isArray(config.additionalComponents)) {
    config.additionalComponents.forEach(url => {
      if (typeof url === 'string' && url.trim()) {
        console.log(url);
      }
    });
  }
" | while IFS= read -r componentUrl; do
  if [ -n "$componentUrl" ]; then
    echo "  Installing: $componentUrl"
    pnpm dlx shadcn@latest add "$componentUrl" --yes --overwrite 2>&1 || echo "    ⚠️ Failed to install (may not exist)"
    sleep 1
  fi
done

echo "✅ Additional component installation completed"
echo ""
echo "Waiting for installation to complete..."
sleep 5
echo "✅ Component installation process completed"

