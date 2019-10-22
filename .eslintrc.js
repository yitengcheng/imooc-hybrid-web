module.exports = {
    root: true,
    env: {
        node: true
    },
    'extends': [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "generator-star-spacing": "off",
        "semi": [
            "error",
            "always"
        ],
        "no-tabs": "off",
        "no-mixed-spaces-and-tabs": "off",
        "no-unused-vars": "off",
        "indent": [
            "error",
            4
        ],
        "eqeqeq": 1,
        "no-useless-return": "off"
    },
    parserOptions: {
        parser: 'babel-eslint'
    }
}
