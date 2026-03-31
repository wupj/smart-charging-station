import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'

export default [
  js.configs.recommended,
  ...vue.configs['flat/essential'],
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      parser: vue.parser,
      globals: {
        uni: 'readonly',
        wx: 'readonly',
        getCurrentPages: 'readonly',
        getApp: 'readonly',
        App: 'readonly',
        Page: 'readonly',
        Component: 'readonly',
        Behavior: 'readonly',
        plus: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        process: 'readonly'
      }
    },
    rules: {
      'no-console': process.env?.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env?.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-unused-vars': 'error',
      'vue/no-v-html': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
    }
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        uni: 'readonly',
        wx: 'readonly',
        getCurrentPages: 'readonly',
        getApp: 'readonly',
        App: 'readonly',
        Page: 'readonly',
        Component: 'readonly',
        Behavior: 'readonly',
        plus: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        process: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescript
    },
    rules: {
      'no-console': process.env?.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env?.NODE_ENV === 'production' ? 'warn' : 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ]
    }
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vue.parser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        uni: 'readonly',
        wx: 'readonly',
        getCurrentPages: 'readonly',
        getApp: 'readonly',
        App: 'readonly',
        Page: 'readonly',
        Component: 'readonly',
        Behavior: 'readonly',
        plus: 'readonly',
        console: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        process: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescript
    },
    rules: {
      'no-console': process.env?.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env?.NODE_ENV === 'production' ? 'warn' : 'off',
      'vue/multi-word-component-names': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' }
      ],
      'vue/no-unused-vars': 'error',
      'vue/no-v-html': 'off'
    }
  },
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.git/**',
      '*.md',
      '.vscode/**',
      '.idea/**',
      'coverage/**',
      '*.log',
      'pnpm-lock.yaml',
      'package-lock.json',
      'yarn.lock',
      '*.d.ts'
    ]
  }
]
