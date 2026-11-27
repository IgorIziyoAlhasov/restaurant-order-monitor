import { defineConfig } from "vitest/config";

export default defineConfig({
  oxc: { jsx: { runtime: "automatic" } },
  test: {
    include: ["tests/{unit,component,integration,contract}/**/*.test.{js,jsx}"],
    environment: "jsdom",
    setupFiles: ["./tests/setup.js"],
  },
});
