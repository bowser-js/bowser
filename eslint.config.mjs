import js from '@eslint/js';
import importPlugin from 'eslint-plugin-import';
import { rules } from 'eslint-config-airbnb-extended';

export default [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  rules.base.bestPractices,
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
    },
    settings: {
      'import/extensition': [
        '.js',
        '.mjs',
        '.cjs'
      ]
    }
  }
];
