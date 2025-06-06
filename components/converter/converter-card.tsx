"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeftRight, Loader2 } from "lucide-react";
import {
	CryptoCurrency,
	FiatCurrency,
	ConversionResult,
	ConversionType,
} from "@/types";
import { convertCurrency } from "@/lib/api";
import { AmountInput } from "./amount-input";
import { CurrencySelector } from "./currency-selector";
import { ConversionResults } from "./conversion-results";
import { formatCurrency } from "@/lib/utils";

interface ConverterCardProps {
	cryptocurrencies: CryptoCurrency[];
	fiatCurrencies: FiatCurrency[];
}

export function ConverterCard({
	cryptocurrencies,
	fiatCurrencies,
}: ConverterCardProps) {
	const [conversionType, setConversionType] =
		useState<ConversionType>("crypto-to-fiat");
	const [amount, setAmount] = useState<number>(1);
	const [sourceCurrency, setSourceCurrency] = useState<string>(
		conversionType === "crypto-to-fiat" ? "BTC" : "USD"
	);
	const [targetCurrency, setTargetCurrency] = useState<string>(
		conversionType === "crypto-to-fiat" ? "USD" : "BTC"
	);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [result, setResult] = useState<ConversionResult | null>(null);

	useEffect(() => {
		// Update default currencies when conversion type changes
		if (conversionType === "crypto-to-fiat") {
			setSourceCurrency((prev) =>
				cryptocurrencies.some((c) => c.symbol === prev) ? prev : "BTC"
			);
			setTargetCurrency((prev) =>
				fiatCurrencies.some((c) => c.id === prev) ? prev : "USD"
			);
		} else {
			setSourceCurrency((prev) =>
				fiatCurrencies.some((c) => c.id === prev) ? prev : "USD"
			);
			setTargetCurrency((prev) =>
				cryptocurrencies.some((c) => c.symbol === prev) ? prev : "BTC"
			);
		}
	}, [conversionType, cryptocurrencies, fiatCurrencies]);

	// Handle conversion
	const handleConvert = async () => {
		setIsLoading(true);
		setError(null);

		try {
			const conversionResult = await convertCurrency(
				amount,
				sourceCurrency,
				targetCurrency
				// conversionType === "crypto-to-fiat"
			);
			setResult(conversionResult);
		} catch (err) {
			console.error("Conversion error:", err);
			setError("Failed to convert currencies. Please try again later.");
		} finally {
			setIsLoading(false);
		}
	};

	// Swap source and target currencies
	const handleSwapCurrencies = () => {
		setConversionType(
			conversionType === "crypto-to-fiat" ? "fiat-to-crypto" : "crypto-to-fiat"
		);
		setSourceCurrency(targetCurrency);
		setTargetCurrency(sourceCurrency);
	};

	return (
		<Card className="w-full max-w-xl mx-auto shadow-lg border-0 bg-gradient-to-br from-card to-card/90 z-10">
			{/* <CardHeader className="pb-3">
        <CardTitle className="text-2xl font-bold text-center">Crypto-Fiat Converter</CardTitle>
      </CardHeader> */}

			<CardContent>
				<Tabs
					defaultValue="crypto-to-fiat"
					value={conversionType}
					onValueChange={(value) => setConversionType(value as ConversionType)}
					className="w-full pt-6"
				>
					<TabsList className="grid grid-cols-2 mb-6">
						<TabsTrigger value="crypto-to-fiat">Crypto → Fiat</TabsTrigger>
						<TabsTrigger value="fiat-to-crypto">Fiat → Crypto</TabsTrigger>
					</TabsList>

					<div className="space-y-6">
						<AmountInput
							value={amount}
							onChange={setAmount}
							currencySymbol={
								conversionType === "crypto-to-fiat"
									? cryptocurrencies.find((c) => c.symbol === sourceCurrency)
											?.symbol || ""
									: fiatCurrencies.find((c) => c.id === sourceCurrency)
											?.symbol || ""
							}
							label={`Amount in ${
								conversionType === "crypto-to-fiat"
									? cryptocurrencies.find((c) => c.symbol === sourceCurrency)
											?.name
									: fiatCurrencies.find((c) => c.id === sourceCurrency)?.name
							}`}
						/>

						<div className="grid gap-2 md:grid-cols-[1fr,auto,1fr] md:items-end">
							<CurrencySelector
								currencies={
									conversionType === "crypto-to-fiat"
										? cryptocurrencies
										: fiatCurrencies
								}
								selectedCurrency={sourceCurrency}
								onSelect={setSourceCurrency}
								label="From"
								type={conversionType === "crypto-to-fiat" ? "crypto" : "fiat"}
							/>

							<div className="flex justify-center items-center">
								<Button
									variant="outline"
									size="icon"
									onClick={handleSwapCurrencies}
									className="h-10 w-10 rounded-full bg-muted/50 hover:bg-muted transition-all duration-200 flex justify-center items-center"
								>
									<ArrowLeftRight className="h-4 w-4" />
									<span className="sr-only">Swap currencies</span>
								</Button>
							</div>

							<CurrencySelector
								currencies={
									conversionType === "crypto-to-fiat"
										? fiatCurrencies
										: cryptocurrencies
								}
								selectedCurrency={targetCurrency}
								onSelect={setTargetCurrency}
								label="To"
								type={conversionType === "crypto-to-fiat" ? "fiat" : "crypto"}
							/>
						</div>

						<Button
							onClick={handleConvert}
							className="w-full mt-6 bg-primary hover:bg-primary/90"
							disabled={isLoading || amount <= 0}
						>
							{isLoading ? (
								<>
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									Converting...
								</>
							) : (
								"Convert"
							)}
						</Button>

						{error && (
							<div className="mt-4 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
								{error}
							</div>
						)}

						{result && !error && (
							<ConversionResults
								result={result}
								conversionType={conversionType}
							/>
						)}
					</div>
				</Tabs>
			</CardContent>
		</Card>
	);
}
