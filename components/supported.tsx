import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const coinsData = [
	{
		name: "Bitcoin",
		icon: "/Bitcoin.svg",
		illustration: "/BitcoinIllus.png",
		description:
			"is the first and most recognized cryptocurrency, offering a decentralized and secure store of value that has gained widespread adoption as 'digital gold.'",
		bgGradient:
			"bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20",
		iconColor: "text-[#F7931A]",
		shadowColor: "shadow-orange-200/20 dark:shadow-orange-900/20",
		hoverShadow: "hover:shadow-orange-300/30 dark:hover:shadow-orange-800/30",
	},
	{
		name: "Ethereum",
		icon: "/ETH.svg",
		illustration: "/EthIllus.png",
		description:
			"enables developers to build decentralized applications and smart contracts on its blockchain, providing a versatile platform.",
		bgGradient:
			"bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
		iconColor: "text-[#454A75]",
		shadowColor: "shadow-blue-200/20 dark:shadow-blue-900/20",
		hoverShadow: "hover:shadow-blue-300/30 dark:hover:shadow-blue-800/30",
	},
	{
		name: "Binance Coin",
		icon: "/BNB-Coin.svg",
		illustration: "/BNBIllus.png",
		description:
			"is widely used on the Binance exchange for trading fee discounts and various applications within the Binance ecosystem.",
		bgGradient:
			"bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20",
		iconColor: "text-[#F0B90B]",
		shadowColor: "shadow-yellow-200/20 dark:shadow-yellow-900/20",
		hoverShadow: "hover:shadow-yellow-300/30 dark:hover:shadow-yellow-800/30",
	},
	{
		name: "Tether",
		icon: "/Tether-Coin.svg",
		illustration: "/TetherIllus.png",
		description:
			"is a stablecoin pegged to the US dollar, providing a reliable means of preserving value and facilitating transactions.",
		bgGradient:
			"bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20",
		iconColor: "text-[#53AE94]",
		shadowColor: "shadow-teal-200/20 dark:shadow-teal-900/20",
		hoverShadow: "hover:shadow-teal-300/30 dark:hover:shadow-teal-800/30",
	},
];

const Supported = () => {
	return (
		<section className="w-full flex justify-center items-center mt-12 md:mt-0">
			<div className="w-5/6 p-2 sm:p-12 md:p-16 lg:p-24">
				<div className="flex flex-col md:flex-row gap-8">
					<div className="flex w-full md:w-1/2 flex-col gap-4">
						<div className="flex items-end gap-4 mb-2">
							<h1 className="font-normal text-3xl text-foreground">
								Supported Coins
							</h1>
							<Image
								src="/ArrowElbowRightDown.svg"
								alt="Arrow icon"
								width={24}
								height={24}
								className="hidden md:block"
							/>
						</div>
						<Card
							className={`${coinsData[0].bgGradient} backdrop-blur-sm border-border/50 ${coinsData[0].shadowColor} shadow-xl ${coinsData[0].hoverShadow} transition-all duration-300 hover:scale-105 dark:shadow-none`}
						>
							<CardHeader className="px-4 pt-4 pb-0">
								<div className="flex bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-full w-max py-1 pl-1 pr-2 gap-1 items-center shadow-sm border border-white/50">
									<div className="flex-shrink-0">
										<Image
											src={coinsData[0].icon}
											alt={`${coinsData[0].name} logo`}
											width={24}
											height={24}
											className="object-contain"
										/>
									</div>
									<p
										className={`font-semibold text-sm ${coinsData[0].iconColor}`}
									>
										{coinsData[0].name}
									</p>
								</div>
							</CardHeader>
							<CardContent className="px-6 pb-6">
								<div className="flex flex-col sm:flex-row items-center gap-6">
									<div className="flex-shrink-0">
										<Image
											src={coinsData[0].illustration}
											alt={`${coinsData[0].name} illustration`}
											width={120}
											height={120}
											className="object-contain"
										/>
									</div>
									<div className="flex-1">
										<p
											className={`text-sm sm:text-base text-justify leading-relaxed ${coinsData[0].iconColor} font-medium`}
										>
											<span className="font-bold text-base sm:text-lg">
												{coinsData[0].name}
											</span>{" "}
											<span className="text-muted-foreground font-normal">
												{coinsData[0].description}
											</span>
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						{/* Kartu Koin Ketiga di Kolom Kiri (Binance Coin) */}
						<Card
							className={`${coinsData[2].bgGradient} backdrop-blur-sm border-border/50 ${coinsData[2].shadowColor} shadow-xl ${coinsData[2].hoverShadow} transition-all duration-300 hover:scale-105 dark:shadow-none`}
						>
							{/* Konten Kartu Binance Coin... */}
							<CardHeader className="px-4 pt-4 pb-0 ">
								<div className="flex bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-full w-max py-1 pl-1 pr-2 gap-1 items-center shadow-sm border border-white/50">
									<div className="flex-shrink-0">
										<Image
											src={coinsData[2].icon}
											alt={`${coinsData[2].name} logo`}
											width={24}
											height={24}
											className="object-contain"
										/>
									</div>
									<p
										className={`font-semibold text-sm ${coinsData[2].iconColor}`}
									>
										{coinsData[2].name}
									</p>
								</div>
							</CardHeader>
							<CardContent className="px-6 pb-6 pt-2">
								<div className="flex flex-col items-center gap-6 sm:flex-row-reverse">
									<div className="flex-shrink-0">
										<Image
											src={coinsData[2].illustration}
											alt={`${coinsData[2].name} illustration`}
											width={120}
											height={120}
											className="object-contain"
										/>
									</div>
									<div className="flex-1">
										<p
											className={`text-sm sm:text-base text-justify leading-relaxed ${coinsData[2].iconColor} font-medium`}
										>
											<span className="font-bold text-base sm:text-lg">
												{coinsData[2].name}
											</span>{" "}
											<span className="text-muted-foreground font-normal">
												{coinsData[2].description}
											</span>
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>

					{/* Kolom Kanan */}
					<div className="flex w-full md:w-1/2 flex-col gap-4">
						{/* Kartu Koin Kedua di Kolom Kanan (Ethereum) */}
						<Card
							className={`${coinsData[1].bgGradient} backdrop-blur-sm border-border/50 ${coinsData[1].shadowColor} shadow-xl ${coinsData[1].hoverShadow} transition-all duration-300 hover:scale-105 dark:shadow-none`}
						>
							{/* Konten Kartu Ethereum... */}
							<CardHeader className="px-4 pt-4 pb-0">
								<div className="flex bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-full w-max py-1 pl-1 pr-2 gap-1 items-center shadow-sm border border-white/50">
									<div className="flex-shrink-0">
										<Image
											src={coinsData[1].icon}
											alt={`${coinsData[1].name} logo`}
											width={24}
											height={24}
											className="object-contain"
										/>
									</div>
									<p
										className={`font-semibold text-sm ${coinsData[1].iconColor}`}
									>
										{coinsData[1].name}
									</p>
								</div>
							</CardHeader>
							<CardContent className="px-6 pb-6 pt-2">
								<div className="flex flex-col sm:flex-row-reverse items-center gap-6">
									<div className="flex-shrink-0">
										<Image
											src={coinsData[1].illustration}
											alt={`${coinsData[1].name} illustration`}
											width={120}
											height={120}
											className="object-contain"
										/>
									</div>
									<div className="flex-1">
										<p
											className={`text-sm sm:text-base text-justify leading-relaxed ${coinsData[1].iconColor} font-medium`}
										>
											<span className="font-bold text-base sm:text-lg">
												{coinsData[1].name}
											</span>{" "}
											<span className="text-muted-foreground font-normal">
												{coinsData[1].description}
											</span>
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						{/* Kartu Koin Keempat di Kolom Kanan (Tether) */}
						<Card
							className={`${coinsData[3].bgGradient} backdrop-blur-sm border-border/50 ${coinsData[3].shadowColor} shadow-xl ${coinsData[3].hoverShadow} transition-all duration-300 hover:scale-105 dark:shadow-none`}
						>
							{/* Konten Kartu Tether... */}
							<CardHeader className="px-4 pt-4 pb-0">
								<div className="flex bg-white/80 dark:bg-white/10 backdrop-blur-sm rounded-full w-max py-1 pl-1 pr-2 gap-1 items-center shadow-sm border border-white/50">
									<div className="flex-shrink-0">
										<Image
											src={coinsData[3].icon}
											alt={`${coinsData[3].name} logo`}
											width={24}
											height={24}
											className="object-contain"
										/>
									</div>
									<p
										className={`font-semibold text-sm ${coinsData[3].iconColor}`}
									>
										{coinsData[3].name}
									</p>
								</div>
							</CardHeader>
							<CardContent className="px-6 pb-6">
								<div className="flex flex-col sm:flex-row items-center gap-6">
									<div className="flex-shrink-0">
										<Image
											src={coinsData[3].illustration}
											alt={`${coinsData[3].name} illustration`}
											width={120}
											height={120}
											className="object-contain"
										/>
									</div>
									<div className="flex-1">
										<p
											className={`text-sm sm:text-base text-justify leading-relaxed ${coinsData[3].iconColor} font-medium`}
										>
											<span className="font-bold text-base sm:text-lg">
												{coinsData[3].name}
											</span>{" "}
											<span className="text-muted-foreground font-normal">
												{coinsData[3].description}
											</span>
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
						{/* Kartu Fiat */}
						<Card className="w-full mt-3 bg-card/80 dark:bg-card/70 backdrop-blur-sm shadow-xl shadow-blue-300/10 border-border/50 hover:shadow-blue-400/20 transition-all duration-300 dark:shadow-none">
							<CardContent className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4">
								<div className="text-center md:text-left">
									<p className="text-base font-lato text-muted-foreground">
										And hundred more{" "}
										<span className="font-semibold text-slate-700">coin</span>{" "}
										and{" "}
										<span className="font-semibold text-slate-700">fiat</span>{" "}
										support
									</p>
								</div>
								<Image
									src="/arrowlongright.svg"
									alt="arrow icon"
									width={48}
									height={24}
									className="hidden sm:block flex-shrink-0"
								/>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Supported;
