import { Suspense } from "react";
import { Metadata } from "next";
import { ConverterCard } from "@/components/converter/converter-card";
import { getCryptoCurrencies, getFiatCurrencies } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/converter/navbar";

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
			<div className="container mx-auto px-4 pt-24 md:pt-36">
				<div className="max-w-4xl mx-auto mb-4 text-center">
					<h1 className="text-3xl md:text-5xl font-bold mb-4">
						Crypto Coin Conversion
					</h1>
					<p className="text-muted-foreground text-md mt-2">
						Free from sign-up, limits, complications with real-time
						<br />
						exchange rates
					</p>
				</div>

				<Suspense fallback={<ConverterSkeleton />}>
					<ConverterCard
						cryptocurrencies={cryptocurrencies}
						fiatCurrencies={fiatCurrencies}
					/>
				</Suspense>

				<div className="mt-4 pt-6 border-t border-border/40 text-center text-sm text-muted-foreground">
					<p>Data provided by CoinMarketCap. Rates are updated in real-time.</p>
				</div>
			</div>
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
