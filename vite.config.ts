import { defineConfig } from "vite";
import suidPlugin from "@suid/vite-plugin";
import solidPlugin from "vite-plugin-solid";
import devtools from 'solid-devtools/vite';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [
    // devtools({
    //   autoname: true,
    // }),
    wasm(),
    topLevelAwait(),
    suidPlugin(), 
    solidPlugin()
  ],
  optimizeDeps: {
    exclude: ['typst-ts-solid']
  },
  resolve: {
    alias: {
      'typst-ts-solid': '/typst-ts-solid/index.cjs'
    }
  },
  build: {
    target: "esnext",
  },
});
