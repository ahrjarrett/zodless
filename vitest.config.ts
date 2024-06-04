import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    exclude: ["node_modules"],
    include: ["test/**/*.spec.ts"],
    globalSetup: ["setupVitest.ts"],
  },
})

