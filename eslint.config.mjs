import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [
    ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended").map(config => ({
        ...config,
        files: ["src/**/*.ts", "gulpfile.js/**/*.js"],
    })),
    {
        files: ["src/**/*.ts"],

        plugins: {
            "@typescript-eslint": typescriptEslint,
        },

        languageOptions: {
            globals: {
                ...globals.node,
            },

            parser: tsParser,
            ecmaVersion: "latest",
            sourceType: "module",
        },

        rules: {
            "indent": ["error", 2, {
                "SwitchCase": 1,
            }],

            "linebreak-style": ["error", "windows"],
            "quotes": ["warn", "double"],
            "semi": ["error", "always"],
            "no-console": "warn",
            "no-unused-vars": "off",

            "@typescript-eslint/no-var-requires": 0,
            "@typescript-eslint/no-unused-vars": "error"
        },
    },
];