import livereload from 'rollup-plugin-livereload';
import dev from 'rollup-plugin-dev';
import replace from '@rollup/plugin-replace';
import image from '@rollup/plugin-image';
import injectProcessEnv from 'rollup-plugin-inject-process-env';

import baseConfigs from './rollup.config.base';

export default {
  ...baseConfigs,
  plugins: baseConfigs.plugins.concat([
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __buildEnv__: 'development',
      __buildDate__: () => new Date(),
      __buildVersion: 15,
    }),
    livereload(),
    image(),
    dev({
      spa: 'build/index.html',
      port: 3000,
      host: '127.0.0.1',
      dirs: ['build'],
    }),
    injectProcessEnv({
      NODE_ENV: 'development',
    }),
  ]),
};
