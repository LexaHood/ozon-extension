import { defineManifest } from '@crxjs/vite-plugin'
import packageJson from './package.json'
const { version } = packageJson

export default defineManifest(async (env) => ({
  manifest_version: 3,
  name: "Ozon extension",
  version,
  version_name: version,
  action: {
    default_popup: "index.html",
  },
  content_scripts: [
    {
      matches: ["https://www.ozon.ru/*"],
      js: ["./src/content/index.tsx"],
      run_at: "document_start",
    },
    {
      matches: ["https://www.ozon.ru/product/*"],
      js: ["./src/content/product_parse.ts"],
      run_at: "document_start",
    },
  ],
}))
