"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background p-4">
			{/* Efek latar belakang buram */}
			<Card className="w-full max-w-lg text-center shadow-2xl bg-card/80 backdrop-blur-lg border-destructive/20 z-10">
				<CardHeader>
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 mb-4">
						<AlertTriangle className="h-6 w-6 text-destructive" />
					</div>
					<CardTitle className="text-2xl font-bold text-destructive">
						Terjadi Kesalahan
					</CardTitle>
				</CardHeader>
				<CardContent>
					<p className="mb-6 text-muted-foreground">
						Maaf, ada sesuatu yang tidak beres. Tim kami telah diberitahu.
						Silakan coba lagi atau kembali ke beranda.
					</p>
					<div className="flex justify-center gap-4">
						<Button onClick={() => reset()}>Coba Lagi</Button>
						<Button variant="outline" asChild>
							<Link href="/">Kembali ke Beranda</Link>
						</Button>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
