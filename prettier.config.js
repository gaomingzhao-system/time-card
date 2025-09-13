/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
export default {
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
    tailwindStylesheets: ['./src/app.css'],

    overrides: [
        {
            files: '*.svelte',
            options: { parser: 'svelte' },
        },
    ],
}
