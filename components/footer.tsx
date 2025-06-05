import Image from "next/image";

export default function Footer() {
	return (
		<footer className="p-2 md:py-4 bg-slate-800 mt-16 text-white flex justify-center">
			<nav className="flex justify-between items-center md:w-3/4">
				<a href="/" className="flex gap-2">
					<Image
						src="/LogoKoin.svg"
						alt="Logo SekepingKoin"
						width={24}
						height={24}
					/>
					<span className="text-xl font-medium">SekepingKoin</span>
				</a>
				<div className="flex gap-8 text-sm font-light">
					<p className="hidden md:block">Privacy Policy</p>
					<p className="hidden md:block">Terms</p>
					<p className="ml-4 md:ml-0">&copy; 2025</p>
				</div>
			</nav>
		</footer>
	);
}
