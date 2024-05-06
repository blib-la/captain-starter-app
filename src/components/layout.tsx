import { AppFrame } from "@captn/joy/app-frame";
import { CustomScrollbars } from "@captn/joy/custom-scrollbars";
import { TitleBar } from "@captn/joy/title-bar";
import Typography from "@mui/joy/Typography";
import type { ReactNode } from "react";

import { CatIcon } from "@/components/cat-icon";

export default function Layout({ children }: { children?: ReactNode }) {
	return (
		<AppFrame
			titleBar={
				<TitleBar color="pink" variant="solid">
					<Typography startDecorator={<CatIcon />}>Lucky Kitten</Typography>
				</TitleBar>
			}
		>
			{children}
		</AppFrame>
	);
}
