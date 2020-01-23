import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/maeven/index.ts',

  output: [
    {
      file: 'lib/cjs/index.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'lib/esm/index.js',
      format: 'esm',
      sourcemap: true
    }
  ],

  plugins: [
    typescript({
      tsconfig: 'tsconfig.build.json'
    })
  ],

  external: [
    'clsx',
    'csx',
    'downshift',
    'react',
    'react-autosize-textarea',
    'react-spring',
    'typestyle'
  ]
};
