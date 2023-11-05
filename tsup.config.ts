import { defineConfig } from 'tsup';

export default defineConfig({
	bundle: true,
	clean: true,
	dts: true,
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	keepNames: true,
	minify: false,
	shims: false,
	skipNodeModulesBundle: true,
	splitting: false,
	sourcemap: true,
	target: 'es2020',
	treeshake: true,
	tsconfig: './tsconfig.json'
});
