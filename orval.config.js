require('dotenv').config();

module.exports = {
  api: {
    output: {
      target: 'src/lib/api.generated.ts',
      mode: 'single',
      //   override: {
      //     mutator: {
      //       path: './src/shared/api/api.ts',
      //       name: 'api',
      //     },
      //   },
    },
    input: {
      target: `${process.env.PUBLIC_API_ENDPOINT}/api/swagger/v1/swagger.json`,
    },
    // hooks: {
    //   afterAllFilesWrite: 'yarn lint:fix',
    // },
  },
};
