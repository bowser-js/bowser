import { defineConfig } from 'tsdown';

const banner = `Bowser - a browser detector
https://github.com/lancedikson/bowser
MIT License | (c) Dustin Diaz 2012-2015
MIT License | (c) Denis Demchenko 2015-2026`;

export default defineConfig([
  {
    entry: ['src/bowser.js'],
    format: ['umd'],
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
