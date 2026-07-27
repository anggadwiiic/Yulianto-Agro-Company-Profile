// vite.config.js
import { defineConfig } from "vite";
import { resolve } from "path";
import fg from "fast-glob";

const htmlFiles = fg.sync("*.html", { cwd: __dirname });

const input = Object.fromEntries(
  htmlFiles.map((file) => {
    const name = file.replace(".html", "").replace(/[-.]/g, "_");
    return [name, resolve(__dirname, file)];
  }),
);

export default defineConfig({
  build: {
    rollupOptions: {
      input,
    },
  },
});
