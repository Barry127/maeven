import babel from '@rollup/plugin-babel';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';
import postcss from 'rollup-plugin-postcss-modules';
import progress from 'rollup-plugin-progress';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',

  output: [
    {
      dir: './cjs',
      format: 'cjs',
      exports: 'auto'
    },
    {
      dir: '.',
      format: 'es',
      entryFileNames: '[name].mjs'
    }
  ],

  preserveModules: true,
  plugins: [
    progress(),
    typescript(),
    babel(),
    postcss({
      modules: {
        generateScopedName: 'mvn_[hash:base64:5]'
      },
      use: ['sass'],
      plugins: [
        autoprefixer(),
        postcssPresetEnv({
          stage: 0
        })
      ]
    })
  ],

  external: [
    'clsx',
    'color',
    'react',
    'react-autosize-textarea',
    'react-dom',
    'react-spring',
    'react-spring/renderprops',
    'react-use-measure'
  ]
};
