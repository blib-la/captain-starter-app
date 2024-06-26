import { globalStyles } from "@captn/joy/styles";
import { ThemeProvider } from "@captn/joy/theme";
import { useSDK } from "@captn/react/use-sdk";
import { USER_LANGUAGE_KEY, USER_THEME_KEY } from "@captn/utils/constants";
import CssBaseline from "@mui/joy/CssBaseline";
import { useColorScheme } from "@mui/joy/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect } from "react";

import package_ from "~package";

const id = package_.name;

export function ThemeHandler() {
	const { setMode } = useColorScheme();
	useSDK<string, { appPath: string }>(id, {
		onMessage(message) {
			console.log(message);
		},
	});

	useEffect(() => {
		const unsubscribeTheme = window.ipc?.on(
			USER_THEME_KEY,
			(theme?: "light" | "dark" | "system") => {
				console.log("theme", { theme });
				if (theme) {
					setMode(theme);
				}
			}
		);
		const unsubscribeLanguage = window.ipc?.on(USER_LANGUAGE_KEY, (locale?: string) => {
			console.log("locale", { locale });
		});
		return () => {
			if (unsubscribeTheme) {
				unsubscribeTheme();
			}

			if (unsubscribeLanguage) {
				unsubscribeLanguage();
			}
		};
	}, [setMode]);
	return null;
}

function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider>
			{globalStyles}
			<Head>
				<title>Captain app</title>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1.0, viewport-fit=cover"
				/>
				<meta charSet="utf8" />
				<meta name="format-detection" content="telephone=no" />
			</Head>
			<ThemeHandler />
			<CssBaseline />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default App;
