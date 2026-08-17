import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

/**
 * Flat config, spread straight from `eslint-config-next`.
 *
 * Previously this went through `FlatCompat` from `@eslint/eslintrc`, translating the
 * old `extends: 'next/core-web-vitals'` strings. Next 16 ships real flat configs —
 * `eslint-config-next/core-web-vitals` and `/typescript` each export a
 * `Linter.Config[]` — so the shim has nothing left to translate, and the package it
 * needed was never a direct dependency here. Lint had been failing to even start
 * since the Next 16 upgrade because of it.
 */
const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
  {
    // Build output and Payload's generated files: not ours to lint, and regenerated
    // wholesale by `generate:importmap` and `migrate:create`. Migrations were most of
    // the noise — every one is scaffolded with `{ db, payload, req }` destructured
    // whether or not it uses them, and their real content is SQL inside a template
    // string, which no rule here has anything to say about.
    ignores: ['.next/', 'src/app/(payload)/admin/importMap.js', 'src/migrations/'],
  },
]

export default eslintConfig
