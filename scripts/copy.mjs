import { promises as fs } from "node:fs";
import path from "node:path";
import process from "node:process";

import meow from "meow";

const cli = meow(
	`
	Usage
	  $ node scripts/copy.mjs --source <sourceDirOrFile> --target <targetDir>

	Options
	  --source, -s  Source directory or file
	  --target, -t  Target directory

	Examples
	  $ node scripts/copy.mjs -s ./source -t ./target
	  $ node scripts/copy.mjs -s ./source.md -t ./out
`,
	{
		importMeta: import.meta,
		flags: {
			source: {
				type: "string",
				shortFlag: "s",
				isRequired: true,
			},
			target: {
				type: "string",
				shortFlag: "t",
				isRequired: true,
			},
		},
	}
);

async function copyFiles(sourcePath_, targetPath_) {
	const sourcePath = path.join(process.cwd(), sourcePath_);
	const targetPath = path.join(process.cwd(), targetPath_);
	try {
		const sourceStats = await fs.stat(sourcePath);
		if (sourceStats.isDirectory()) {
			const files = await fs.readdir(sourcePath);
			await fs.mkdir(targetPath, { recursive: true });

			for (const file of files) {
				const sourcePath__ = path.join(sourcePath, file);
				const destinationPath = path.join(targetPath, file);
				await copyFile(sourcePath__, destinationPath);
			}
		} else if (sourceStats.isFile()) {
			const fileName = path.basename(sourcePath);
			const destinationPath = path.join(targetPath, fileName);
			await copyFile(sourcePath, destinationPath);
		}
	} catch (error) {
		console.error("Error during file copy:", error);
	}
}

async function copyFile(sourcePath, destinationPath) {
	await fs.copyFile(sourcePath, destinationPath);
	console.log(`Copied ${sourcePath} to ${destinationPath}`);
}

// Validate command line inputs
if (!cli.flags.source || !cli.flags.target) {
	cli.showHelp(); // Show help and exit if required flags are missing
}

// Execute the copy operation
await copyFiles(cli.flags.source, cli.flags.target);
