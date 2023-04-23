/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'cypress';
import { beforeRunHook, afterRunHook } from 'cypress-mochawesome-reporter/lib';

export default defineConfig({
  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },

  e2e: {
    baseUrl: 'http://localhost:3000',
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      reportPageTitle: '測試報告',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
      // eslint-disable-next-line global-require
      require('cypress-mochawesome-reporter/plugin')(on);

      on('before:run', async (details) => {
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        await afterRunHook();
      });
    },
  },
});
