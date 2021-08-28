module.exports =
  process.env.NODE_ENV === 'test'
    ? {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                node: 'current',
              },
            },
          ],
          '@babel/preset-typescript',
        ],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              regenerator: true,
            },
          ],
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-export-default-from',
        ],
      }
    : {};
