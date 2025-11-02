// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/<repo-name>/", // 🔥 여기에 네 깃허브 저장소 이름
});
