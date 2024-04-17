import { useSDK } from "@captn/react/use-sdk";
import { useEffect } from "react";

export function useUnload(appId: string, action: string, payload = appId) {
	const { send } = useSDK<unknown, string>(appId, {});
	useEffect(() => {
		function beforeUnload() {
			send({ action, payload });
		}

		window.addEventListener("beforeunload", beforeUnload);
		return () => {
			window.removeEventListener("beforeunload", beforeUnload);
		};
	}, [send, payload, action]);
}
