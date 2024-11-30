import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(async ({ mode }) => {
  return {
    publicDir: "assets",
    server: {
      port: 8080,
    },

    build: {
      minify: false,
      minifyIdentifiers: false,
      minifySyntax: false,
      minifyWhitespace: false,
      target: "esnext",
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
        },
      },
    },
  };
});
