import PlayIcon from "@mui/icons-material/PlayArrow";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Sheet from "@mui/joy/Sheet";
import Image from "next/image";

import { RunButton } from "@captn/joy/run-button";
import { SaveButton } from "@captn/joy/save-button";
import { APP_ID } from "@/constants";
import { randomSeed } from "@/utils/random-seed";
import { useTextToImage } from "@captn/react/use-text-to-image";
import models from "@/data/models.json";
import { useRequiredDownloads } from "@captn/react/use-required-downloads";

export function LuckyKitten() {
	const { generate, start, stop, image, isGenerating, isLoading, isRunning } =
		useTextToImage(APP_ID);
	const { isCompleted } = useRequiredDownloads(models);

	return (
		<Box
			sx={{
				position: "absolute",
				inset: 0,
				display: "flex",
				flexDirection: "column",
				overflow: "hidden",
			}}
		>
			<Sheet sx={{ display: "flex", gap: 1, py: 2, px: 1 }}>
				<RunButton
					disabled={isLoading || !isCompleted}
					isLoading={isLoading}
					isRunning={isRunning}
					onStop={stop}
					onStart={() => {
						start({
							model: "stabilityai/stable-diffusion-xl-base-1.0/sd_xl_base_1.0_0.9vae.safetensors",
							model_type: "stable-diffusion-xl",
						});
					}}
				/>
				<Box sx={{ flex: 1 }} />
				<Button
					disabled={isGenerating || !isRunning}
					startDecorator={isGenerating ? <CircularProgress /> : <PlayIcon />}
					onClick={() => {
						generate({
							prompt: "exaggerated illustration of a cute kitten in a funny situation, adorable, modern cartoon style, best quality, 4k, highres digital art",
							negative_prompt:
								"worst quality, deformed, blurry, smudge, extra limbs, photo, doodle, comic, scribble, sketch, pattern, multiple views, simplified, vector art",
							seed: randomSeed(),
						});
					}}
				>
					Generate
				</Button>
				<SaveButton image={image} prompt="illustration of a cute kitten" appId={APP_ID} />
			</Sheet>

			<Box
				sx={{
					position: "relative",
					flex: 1,
					m: 1,
				}}
			>
				<Image
					src={image || "/assets/kitten.png"}
					alt="illustration of a cute kitten"
					layout="fill"
					style={{
						maxWidth: 1024,
						maxHeight: 1024,
						margin: "auto",
						objectFit: "contain",
						objectPosition: "center",
					}}
				/>
			</Box>
		</Box>
	);
}
