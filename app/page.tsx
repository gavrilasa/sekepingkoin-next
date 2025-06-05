import { Suspense } from "react";
import { Metadata } from "next";
import { ConverterCard } from "@/components/converter/converter-card";
import { getCryptoCurrencies, getFiatCurrencies } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
	title: "SekepingKoin Next",
	description:
		"Convert between cryptocurrencies and fiat currencies in real-time",
};

export default async function Home() {
	const [cryptocurrencies, fiatCurrencies] = await Promise.all([
		getCryptoCurrencies(),
		getFiatCurrencies(),
	]);

	return (
		<main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
			<Navbar />
			<div className="container mx-auto px-4 pt-28 md:pt-36">
				<div className="max-w-4xl mx-auto mb-4 text-center flex flex-col justify-center items-center gap-3 md:gap-4">
					<h1 className="text-5xl font-bold">Crypto Coin Conversion</h1>
					<p className="text-muted-foreground text-sm md:text-base text-center w-5/6 md:w-1/2">
						Free from sign-up, limits, complications with real-time exchange
						rates
					</p>
				</div>

				<Suspense fallback={<ConverterSkeleton />}>
					<ConverterCard
						cryptocurrencies={cryptocurrencies}
						fiatCurrencies={fiatCurrencies}
					/>
				</Suspense>
			</div>

			<Footer />
		</main>
	);
}

function ConverterSkeleton() {
	return (
		<div className="w-full max-w-3xl mx-auto flex justify-center items-center">
			<Skeleton className="h-[250px] w-3/4 rounded-xl" />
		</div>
	);
}
