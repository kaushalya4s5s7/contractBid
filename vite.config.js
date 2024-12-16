import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"], // Exclude lucide-react from optimization
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"], // Resolve these file types
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias @ to src folder for easier imports
    },
  },
});
