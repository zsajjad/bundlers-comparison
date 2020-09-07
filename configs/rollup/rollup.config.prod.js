import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import url from '@rollup/plugin-url';
import { terser } from 'rollup-plugin-terser';
// import analyze from 'rollup-plugin-analyzer';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import filesize from 'rollup-plugin-filesize';
import visualizer from 'rollup-plugin-visualizer';
import image from '@rollup/plugin-image';

import baseConfigs from './rollup.config.base';
// import imagemin from 'rollup-plugin-imagemin';
// const imageminConfigs = require('../imageminConfigs');

export default {
  ...baseConfigs,
  input: './src/index.js',
  output: {
    entryFileNames: '[name]-[hash].js',
    dir: 'build/',
  },
  plugins: baseConfigs.plugins.concat([
    // imagemin({
    //   verbose: true,
    //   preserveTree: true,
    //   ...imageminConfigs,
    // }),
    image(),
    url({
      fileName: '[dirname][hash][extname]',
    }),
    terser(),
    babel({ babelHelpers: 'bundled' }),
    visualizer(),
    filesize(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __buildEnv__: 'development',
      __buildDate__: () => new Date(),
      __buildVersion: 15,
    }),
    injectProcessEnv({
      NODE_ENV: 'production',
    }),
  ]),
};
