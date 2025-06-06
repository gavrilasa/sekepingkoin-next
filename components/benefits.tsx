import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Impor komponen Card dari Shadcn UI

const Features = () => {
	const featureItems = [
		{
			title: "Privacy",
			icon: "/Privacy.png",
			description: "Provide Crypto Conversion without Registration",
		},
		{
			title: "Many Choice",
			icon: "/ManyChoice.png",
			description: "More than Hundreds Coin and Fiat",
		},
		{
			title: "Support",
			icon: "/Support.png",
			description: "We will help and ready to answer your questions",
		},
		{
			title: "Safety",
			icon: "/Safety.png",
			description: "We will not safe your information in our services",
		},
	];

	return (
		<section className="w-full flex justify-center items-center mt-12 md:mt-0">
			<div className="flex w-5/6 flex-col md:flex-row justify-center items-center p-2 sm:p-12 md:p-16 lg:p-24 gap-8">
				<div className="flex flex-col justify-start h-auto md:h-full w-full md:w-1/2 lg:w-2/5 gap-4 md:gap-8">
					<h1 className="font-semibold text-3xl sm:text-4xl lg:text-5xl md:text-left text-foreground">
						Trusted by Many People
					</h1>
					<div className="flex flex-col gap-4">
						<p className="md:text-justify font-normal text-base leading-relaxed text-left text-muted-foreground">
							Discover the Advantages of Secure and Hassle-Free Transactions
							with Our Platform, Where Convenience Meets Reliability for
							Effortless Crypto Coin Conversion to Fiat Currency and Seamless
							Fiat to Coin Transactions.
						</p>
						<div className="flex gap-3 items-center justify-start mt-4">
							<Image
								src="/peoplesatisfied.png"
								alt="Satisfied users icon"
								width={96}
								height={96}
								className="object-contain"
							/>
							<p className="font-lato font-medium text-sm sm:text-base text-muted-foreground">
								Many People Satisfied
							</p>
						</div>
					</div>
				</div>

				<div className="relative flex w-full md:w-1/2 lg:w-3/5 items-center justify-center aspect-[4/3] md:aspect-auto md:h-full">
					<div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 dark:opacity-20 bg-[url(/blue-ellip.png)] object-contain"></div>
					<div className="relative grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 w-full max-w-xl md:max-w-2xl z-10">
						{featureItems.map((item) => (
							<Card
								key={item.title}
								className="bg-card/80 dark:bg-card/70 dark:shadow-none backdrop-blur-sm shadow-xl shadow-blue-300/10 border-border/50 hover:shadow-blue-400/20 transition-all duration-300 hover:scale-105"
							>
								<CardHeader className="pb-3 pt-5 px-5">
									<div className="flex justify-between">
										<CardTitle className="font-semibold text-xl text-foreground">
											{item.title}
										</CardTitle>
										<Image
											src={item.icon}
											alt={`${item.title} icon`}
											width={96}
											height={96}
											className="object-contain ml-2"
										/>
									</div>
								</CardHeader>
								<CardContent className="px-5 sm:px-6 pb-5">
									<p className="font-lato text-sm sm:text-base text-muted-foreground">
										{item.description}
									</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Features;
