/* eslint-disable import/no-named-as-default-member */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import prettierPlugin from "eslint-plugin-prettier/recommended";
import tseslint, { parser } from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import";
import sonarjs from "eslint-plugin-sonarjs";
import { findUpSync } from "find-up-simple";
import eslint from "@eslint/js";
import globals from "globals";
import path from "path";

const GLOB_EXCLUDE = [
  "**/.astro",
  "**/node_modules",
  "**/dist",
  "**/package-lock.json",
  "**/yarn.lock",
  "**/pnpm-lock.yaml",
  "**/bun.lockb",
  "**/build",
  "**/output",
  "**/coverage",
  "**/temp",
  "**/.temp",
  "**/tmp",
  "**/.tmp",
  "**/.history",
  "**/.vitepress/cache",
  "**/.nuxt",
  "**/.next",
  "**/.svelte-kit",
  "**/.vercel",
  "**/.changeset",
  "**/.idea",
  "**/.cache",
  "**/.output",
  "**/.vite-inspect",
  "**/.yarn",
  "**/.expo",
  "**/vite.config.*.timestamp-*",
  "**/.git",
  "**/.DS_Store",
  "**/.env*",
  "**/tsconfig*.json",
  "**/public",
  "**/static",
  "**/assets",
  "**/__snapshots__",
  "**/*.d.ts",
  "**/*.min.*",
  "**/LICENSE*",
];

const tsConfigPath = findUpSync("tsconfig.json", {
  cwd: process.cwd(),
});

if (tsConfigPath == null) {
  throw new Error("No tsconfig.json found");
}

const rootDirectory = path.dirname(tsConfigPath);

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  sonarjs.configs.recommended,
  prettierPlugin,
  {
    plugins: {
      import: importPlugin,
    },
    languageOptions: {
      parser,
      parserOptions: {
        projectService: {},
        tsconfigRootDir: rootDirectory,
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: 2022,
        sourceType: "module",
      },
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        document: "readonly",
        navigator: "readonly",
        window: "readonly",
      },
      sourceType: "module",
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: tsConfigPath,
        },
      },
    },
  },
  importPlugin.flatConfigs.typescript,
  {
    rules: {
      ...importPlugin.flatConfigs.recommended.rules,
      "import/no-dynamic-require": "warn",
      "import/no-unresolved": "off",
      "import/newline-after-import": "error",
      "import/first": "error",
      "import/no-duplicates": ["error", { "prefer-inline": true }],
      "@typescript-eslint/no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "axios",
              message: "Please use fetch instead",
            },
          ],
        },
      ],
      "sonarjs/pseudo-random": "off",
    },
  },
  {
    ignores: [...GLOB_EXCLUDE],
  },
  eslintPluginAstro.configs["flat/recommended"],
);
