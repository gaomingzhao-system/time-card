// Tauri doesn't have a Node.js server to do proper SSR
// so we use adapter-static with a fallback to index.html to put the site in SPA mode
// See: https://svelte.dev/docs/kit/single-page-apps
// See: https://v2.tauri.app/start/frontend/sveltekit/ for more info
import adapter from '@sveltejs/adapter-vercel'
// if you wanna build it as a macos app, apply the code below, on reverse, you can use adapter-vercel to deploy it as a web app
// macos appでしたら、下記のコードを適用してください。逆に、webアプリとしてデプロイしたい場合は、adapter-vercelを使用してください。
// import  adapter  from "@sveltejs/adapter-static";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),
    kit: {
        adapter: adapter({
            runtime: 'nodejs22.x',
        }),
    },
    alias: {
        '@/*': './path/to/lib/*',
    },
}

export default config
