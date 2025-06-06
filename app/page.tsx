import { Suspense } from "react";
import { Metadata } from "next";
import { ConverterCard } from "@/components/converter/converter-card";
import { getCryptoCurrencies, getFiatCurrencies } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Benefits from "@/components/benefits";
import Supported from "@/components/supported";
import Image from "next/image";

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
		<main className="min-h-screen bg-gradient-to-b from-background to-muted/30 scroll-smooth">
			<div className="hidden md:block">
				<Image
					src="/BNB-Coin.svg"
					width={96}
					height={96}
					alt="ETH Logo"
					className="absolute -rotate-6 top-48 left-48 blur-sm hover:-rotate-12 hover:scale-110 hover:blur-0 transition-all ease-in-out duration-300"
				/>
				<Image
					src="/ETH.svg"
					width={96}
					height={96}
					alt="ETH Logo"
					className="absolute rotate-6 bottom-48 left-64 blur-sm hover:rotate-12 hover:scale-110 hover:blur-0 transition-all ease-in-out duration-300"
				/>
				<Image
					src="/Bitcoin.svg"
					width={96}
					height={96}
					alt="ETH Logo"
					className="absolute rotate-6 top-48 right-48 blur-sm hover:rotate-12 hover:scale-110 hover:blur-0 transition-all ease-in-out duration-300"
				/>
				<Image
					src="/Tether-Coin.svg"
					width={96}
					height={96}
					alt="ETH Logo"
					className="absolute -rotate-6 bottom-48 right-64 blur-sm hover:-rotate-12 hover:scale-110 hover:blur-0 transition-all ease-in-out duration-300"
				/>
			</div>

			<Navbar />
			<div className="container mx-auto px-4 pt-28 md:pt-36 min-h-screen">
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
			{/* <div className="relative bottom-0 flex flex-col items-center justify-center gap-1 mb-4 animate-[subtle-bounce_2s_infinite] z-0">
				<p className="text-sm" style={{ color: "#B0B0B0" }}>
					About SekepingKoin
				</p>
				<img src="/ArrowDown.svg" alt="" className="pb-2" />
			</div> */}

			<Benefits />

			<Supported />

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
