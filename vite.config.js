import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  env: {
    VITE_BACKEND_URL: "http://localhost:3000",
  },
});
