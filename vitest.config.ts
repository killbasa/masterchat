import { defineConfig } from 'vitest/config';

export default defineConfig({
	test: {
		globals: true,
		coverage: {
			provider: 'istanbul',
			reporter: ['text']
		},
		globalSetup: 'tests/vitest.setup.ts'
	}
});
