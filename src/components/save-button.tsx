import { useSDK } from "@captn/react/use-sdk";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/joy/Button";
import { useCallback, useEffect, useRef } from "react";
import { v4 } from "uuid";

import { APP_ID } from "@/constants";
import { useResettableState } from "@/hooks/use-resettable-state";

export function SaveButton({ image, prompt }: { image: string; prompt: string }) {
	const [saved, setSaved] = useResettableState(false, 3000);
	const promptCache = useRef(prompt);
	const imageCache = useRef(image);
	const { writeFile } = useSDK<unknown, string>(APP_ID, {});
	const saveImage = useCallback(async () => {
		const id = v4();
		await writeFile(
			`images/${id}.png`,
			image.split(";base64,").pop()!,
			{
				encoding: "base64",
			},
			promptCache.current
		);
		setSaved(true);
	}, [image, writeFile, setSaved]);

	useEffect(() => {
		if (imageCache.current !== image) {
			promptCache.current = prompt;
		}

		imageCache.current = image;
	}, [image, prompt]);

	useEffect(() => {
		async function handleSave(event: KeyboardEvent) {
			if (event.key === "s" && event.ctrlKey) {
				event.preventDefault();
				await saveImage();
			}
		}

		window.addEventListener("keydown", handleSave);
		return () => {
			window.removeEventListener("keydown", handleSave);
		};
	}, [saveImage]);
	return (
		<Button
			color={saved ? "success" : "neutral"}
			variant="soft"
			startDecorator={saved ? <CheckIcon /> : <SaveIcon />}
			onClick={saveImage}
		>
			{saved ? "Saved" : "Save"}
		</Button>
	);
}
