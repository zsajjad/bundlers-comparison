import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import reactSvg from 'rollup-plugin-react-svg';
import styles from 'rollup-plugin-styles';
import html from 'rollup-plugin-html2';

export default {
  input: 'src/index.js',
  output: {
    dir: 'build/',
  },
  plugins: [
    html({
      template: 'src/index.html',
    }),
    babel(),
    nodeResolve({
      browser: true,
      customResolveOptions: {
        moduleDirectory: ['node_modules', 'src'],
      },
    }),
    reactSvg(),
    json(),
    styles(),
    commonjs({
      include: ['node_modules/**'],
    }),
  ],
};
