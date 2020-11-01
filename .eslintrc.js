module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        'react/display-name': 0,
        'space-infix-ops': ['error'],
        'space-before-blocks': ['error', 'always'],
        'indent': ['error', 4],
        'semi': 'error',
        'react/prop-types': 'off',
        'quotes': ['error', 'single'],
        'keyword-spacing': ['error', {'before': true, 'after': true}],
        'object-curly-spacing': 'error',
        'react/jsx-curly-spacing': ['error'],
        'padding-line-between-statements': ['error', {'blankLine': 'always', 'prev': '*', 'next': 'return'}],
    }
};