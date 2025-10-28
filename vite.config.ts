import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

// Resolve a __dirname equivalent from import.meta.url for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export default defineConfig({
  plugins: [
    // Use Vite's built-in error overlay and dev server behaviors.
    
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "client/public"),
    },
  },
  root: path.resolve(__dirname, "src"),
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    strictPort: true,
    fs: {
      strict: false,
    },
  },
});
