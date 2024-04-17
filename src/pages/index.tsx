import Head from "next/head";

import Layout from "@/components/layout";
import { RandomImage } from "@/components/random-image";
import { RequiredDownloads } from "@/components/required-downloads";

export default function Page() {
	return (
		<Layout>
			<Head>
				<title>Lucky Kitten</title>
			</Head>
			<RequiredDownloads />
			<RandomImage />
		</Layout>
	);
}
