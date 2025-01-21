import {loadEnv} from "vite";
import {defineConfig} from "vitest/config";

export default defineConfig({
    test: {
        setupFiles: ['/test/bootstrap.ts'],
        env: loadEnv('test', process.cwd(), ''),
    }
})