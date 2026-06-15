import { defineConfig } from 'tsdown';
import babel from '@rolldown/plugin-babel'

const banner = `Bowser - a browser detector
https://github.com/lancedikson/bowser
MIT License | (c) Dustin Diaz 2012-2015
MIT License | (c) Denis Demchenko 2015-2026`;

export default defineConfig([
  {
    entry: ['src/bowser.js'],
    format: ['umd'],
    plugins:[
      babel({
        presets: [['@babel/preset-env', {
          useBuiltIns: 'usage',
          corejs: '3',
          modules: 'cjs',
          loose: true,
          targets: {
            ie: '8',
            browsers: '>2%'
          }
        }]],
        "plugins": [
          "add-module-exports"
        ]
      })
    ],
    outDir: 'dist/umd', // universal module definition
    globalName: 'Bowser',
    dts: false,
    clean: true,
  },
  {
    entry: ['src/bowser.js'],
    format: ['esm'],
    outDir: 'dist/esm', // es module
    dts: false,
    clean: true
  },
])
