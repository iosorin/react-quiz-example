module.exports = {
    parser: "@typescript-eslint/parser",

    parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
            jsx: true
        }
    },

    settings: {
        react: {
            version: "detect"
        }
    },

    extends: [
        "plugin:react/recommended",
        'plugin:react-hooks/recommended',
        "plugin:@typescript-eslint/recommended",
        "prettier/@typescript-eslint",
        "plugin:prettier/recommended"
    ],

    rules: {
        // Common
        // "brace-style": [1, "stroustrup"],
        'newline-before-return': "error",
        'object-curly-newline': ['error', {
            ImportDeclaration: { minProperties: 2048 }
        }],
        'no-unused-vars': 'warn',

        // React
        "react/prop-types": "off",
        "react/no-set-state": "warn",
        "react/no-string-refs": "error",
        "react/prefer-es6-class": "warn",
        "react/prefer-stateless-function": "error",
        "react/require-render-return": "error",
        "react/self-closing-comp": "error",
        "react/sort-comp": "error",
        "react/sort-prop-types": "error",
        "react/require-extension": "off",
        "react/wrap-multilines": "off",

        // Hooks
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",

        // JSX
        "react/jsx-boolean-value": "error",
        "react/jsx-closing-bracket-location": "error",
        "react/jsx-equals-spacing": "error",
        "react/jsx-indent-props": [ "error", 4 ],
        "react/jsx-indent": [ "error", 4 ],
        "react/jsx-key": "error",
        // "react/jsx-no-bind": "warn",
        "react/jsx-no-literals": "off",
        "react/jsx-no-target-blank": "error",
        "react/jsx-pascal-case": "error",
        "react/jsx-sort-props": "error",
        "react/jsx-tag-spacing": "error",
        // "react/jsx-curly-spacing": [ "error", "always" ],
        // "react/jsx-handler-names": "error",

        // Typescript
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-use-before-define": "off",
    },

    overrides: [
        {
            files: ["*.tsx"],
            rules: {
            }
        }
    ],

    settings: {
        "import/resolver": {
            typescript: {
                "react/prop-types": "error",
            }
        }
    },
};
