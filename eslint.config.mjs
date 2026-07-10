import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import { configs, plugins } from 'eslint-config-airbnb-extended';

export default [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  // Stylistic plugin
  plugins.stylistic,
  // Import X plugin
  plugins.importX,
  // Airbnb base recommended config
  ...configs.base.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-underscore-dangle': 0,
      'no-void': 0,
      'import/prefer-default-export': 1,
      'import-x/extensions': [
        'error',
        'always',
        {
          ignorePackages: true,
          js: 'always',
        },
      ],
      '@stylistic/max-len': 0,
      '@stylistic/arrow-parens': 0,
    },
  },
];
