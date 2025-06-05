import Image from "next/image";
import { ModeToggle } from "../ui/mode-toggle";

export default function Navbar() {
	return (
		<nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-5/6 md:w-3/4 h-16 px-6 py-3 bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-lg hover:bg-white/15 dark:hover:bg-black/15 transition-all duration-300 flex items-center">
			<div className="w-full flex justify-between items-center">
				<div className="flex items-center md:space-x-3">
					<div>
						<Image
							src="/LogoKoin.svg"
							alt="Logo SekepingKoin"
							width={28}
							height={28}
							className="drop-shadow-sm"
						/>
					</div>
					<p className="pl-2 font-semibold text-lg text-foreground/90 hover:text-foreground transition-colors duration-200">
						SekepingKoin
					</p>
				</div>

				<div className="backdrop-blur-sm border-white/30 dark:border-white/20">
					<ModeToggle />
				</div>
			</div>
		</nav>
	);
}
