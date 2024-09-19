import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/<BBAP>/", // Replace <BBAP> with your repository name if necessary
  build: {
    outDir: "dist", // Ensure this is set to 'dist'
  },
});
