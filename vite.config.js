import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        produk: resolve(__dirname, "produk.html"),
        pengunjung: resolve(__dirname, "pengunjung.html"),
        artikel: resolve(__dirname, "artikel.html"),
        // Tambahkan halaman HTML baru di bawah ini
        // booster: resolve(__dirname, "booster-kelengkeng.html"),
      },
    },
  },
});
