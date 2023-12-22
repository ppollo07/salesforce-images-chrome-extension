import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

export default defineManifest({
  name: packageData.name,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/logo-16.png',
    32: 'img/logo-34.png',
    48: 'img/logo-48.png',
    128: 'img/logo-128.png',
  },
  host_permissions: [
    'https://*.dx.commercecloud.salesforce.com/*'
  ],
  content_scripts: [
    {
      matches: ['https://*.dx.commercecloud.salesforce.com/*'],
      js: ['src/contentScript/index.ts'],
    },
  ],
  permissions: ['storage'],
})
