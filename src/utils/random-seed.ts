export function randomSeed(max = 1_000_000_000, min = 1) {
	return Math.ceil(Math.random() * Math.ceil(max)) + Math.ceil(min);
}
