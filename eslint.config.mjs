import next from "eslint-config-next/core-web-vitals";

const config = [
  ...next,
  { ignores: ["test-results/**", "playwright-report/**", "coverage/**"] },
];

export default config;
