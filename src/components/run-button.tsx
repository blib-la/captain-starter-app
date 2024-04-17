import { useRequiredDownloads } from "@captn/react/use-required-downloads";
import PlayIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import Button from "@mui/joy/Button";
import CircularProgress from "@mui/joy/CircularProgress";

import { allRequiredDownloads } from "@/data/all-required-downloads";

export interface RunButtonProperties {
	isLoading: boolean;
	isRunning: boolean;

	onStop(): void;

	onStart(): void;
}

export function RunButton({ isLoading, isRunning, onStart, onStop }: RunButtonProperties) {
	const { isCompleted } = useRequiredDownloads(allRequiredDownloads);

	return isRunning ? (
		<Button
			disabled={isLoading || !isCompleted}
			color="danger"
			variant="soft"
			startDecorator={isLoading ? <CircularProgress /> : <StopIcon />}
			onClick={() => {
				onStop();
			}}
		>
			Stop
		</Button>
	) : (
		<Button
			disabled={isLoading || !isCompleted}
			color="success"
			variant="soft"
			startDecorator={isLoading ? <CircularProgress /> : <PlayIcon />}
			onClick={() => {
				onStart();
			}}
		>
			Start
		</Button>
	);
}
