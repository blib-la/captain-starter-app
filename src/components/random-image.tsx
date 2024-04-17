import { useSDK } from "@captn/react/use-sdk";
import PlayIcon from "@mui/icons-material/PlayArrow";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";
import Sheet from "@mui/joy/Sheet";
import Image from "next/image";
import { useState } from "react";

import { RunButton } from "@/components/run-button";
import { SaveButton } from "@/components/save-button";
import { APP_ID } from "@/constants";
import { useUnload } from "@/hooks/use-unload";
import { randomSeed } from "@/utils/random-seed";

export function RandomImage() {
	const [isRunning, setIsRunning] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isGenerating, setIsGenerating] = useState(false);
	const [image, setImage] = useState("/kitten.png");

	const { send } = useSDK<unknown, string>(APP_ID, {
		onMessage(message) {
			switch (message.action) {
				case "text-to-image:started": {
					setIsRunning(true);
					setIsLoading(false);
					break;
				}

				case "text-to-image:stopped": {
					setIsRunning(false);
					setIsLoading(false);
					break;
				}

				case "text-to-image:generated": {
					setIsGenerating(false);
					setImage(message.payload);
					break;
				}

				default: {
					break;
				}
			}
		},
	});

	useUnload(APP_ID, "text-to-image:stop");

	return (
		<Box>
			<Sheet sx={{ display: "flex", gap: 1, py: 2, px: 1 }}>
				<RunButton
					isLoading={isLoading}
					isRunning={isRunning}
					onStop={() => {
						setIsLoading(true);
						send({ action: "text-to-image:stop", payload: APP_ID });
					}}
					onStart={() => {
						setIsLoading(true);
						send({ action: "text-to-image:start", payload: APP_ID });
					}}
				/>
				<Box sx={{ flex: 1 }} />
				<Button
					disabled={isGenerating || !isRunning}
					startDecorator={isGenerating ? <CircularProgress /> : <PlayIcon />}
					onClick={() => {
						if (isRunning) {
							setIsGenerating(true);
							send({
								action: "text-to-image:settings",
								payload: {
									prompt: "exaggerated illustration of a cute kitten in a funny situation, adorable, modern cartoon style, best quality, 4k, highres digital art",
									negative_prompt:
										"worst quality, deformed, blurry, smudge, extra limbs, photo, doodle, comic, scribble, sketch, pattern, multiple views, simplified, vector art",
									seed: randomSeed(),
								},
							});
						}
					}}
				>
					Generate
				</Button>
				<SaveButton image={image} prompt="illustration of a cute kitten" />
			</Sheet>
			<Box
				sx={{
					position: "relative",
					width: "100%",
					px: 1,
					py: 1,
				}}
			>
				<Box
					sx={{
						position: "relative",
						width: "100%",
						maxWidth: 1024,
						mx: "auto",
						aspectRatio: 1,
					}}
				>
					<Image src={image} alt="illustration of a cute kitten" layout="fill" />
				</Box>
			</Box>
		</Box>
	);
}
