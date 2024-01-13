import { config } from 'dotenv';
import { resolve } from 'node:path';

export function setup() {
	config({ path: resolve(__dirname, '.env.test') });
}
