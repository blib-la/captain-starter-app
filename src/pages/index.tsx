import Head from "next/head";

import Layout from "@/components/layout";
import { LuckyKitten } from "@/components/lucky-kitten";
import { RequiredDownloads } from "@captn/joy/required-downloads";

import models from "@/data/models.json";

export default function Page() {
	return (
		<Layout>
			<Head>
				<title>Lucky Kitten</title>
			</Head>
			<RequiredDownloads allRequiredDownloads={models} />
			<LuckyKitten />
		</Layout>
	);
}
