import { defineConfig } from "vite";
import suidPlugin from "@suid/vite-plugin";
import solidPlugin from "vite-plugin-solid";
import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    // devtools({
    //   autoname: true,
    // }),
    suidPlugin(), 
    solidPlugin()
  ],
  build: {
    target: "esnext",
  },
});
