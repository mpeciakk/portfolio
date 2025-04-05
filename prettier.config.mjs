import prettierPluginSortImports from "prettier-plugin-sort-imports";

export default {
  arrowParens: "always",
  bracketSpacing: true,
  htmlWhitespaceSensitivity: "css",
  insertPragma: false,
  jsxSingleQuote: false,
  printWidth: 80,
  proseWrap: "always",
  quoteProps: "as-needed",
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
  importOrder: [
    "^react",
    "^react*",
    "^expo*",
    "^next*",
    "^astro*",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@/",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  plugins: [
    import.meta.resolve("prettier-plugin-tailwindcss"),
    import.meta.resolve("prettier-plugin-astro"),
    prettierPluginSortImports,
  ],
  overrides: [
    {
      files: ["*.astro"],
      options: {
        parser: "astro",
      },
    },
  ],
};
