import { readFileSync } from "node:fs";

import transpileModules from "next-transpile-modules";

const package_ = JSON.parse(readFileSync("./package.json", "utf8"));

const withTM = transpileModules([
	"@mui/joy",
	"@captn/joy",
	"@captn/utils",
	"@captn/react",
	"@captn/theme",
]);

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	cleanDistDir: true,
	distDir: package_.name,
	trailingSlash: true,
	images: {
		unoptimized: true,
	},
};

export default withTM(nextConfig);
