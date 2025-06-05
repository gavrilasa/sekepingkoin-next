// File: lib/api.ts

import { CryptoCurrency, FiatCurrency, ConversionResult } from "@/types";

const getBaseUrl = (): string => {
	if (typeof window !== "undefined") {
		return "";
	}
	if (process.env.NEXT_PUBLIC_APP_URL) {
		return process.env.NEXT_PUBLIC_APP_URL;
	}
	return `http://localhost:${process.env.PORT || 3001}`;
};

export async function getCryptoCurrencies(): Promise<CryptoCurrency[]> {
	const functionName = "getCryptoCurrencies";
	const baseUrl = getBaseUrl();
	const apiUrl = `${baseUrl}/api/coinmarketcap/listings`;

	try {
		// console.log(`[${functionName}] Attempting to fetch from: "${apiUrl}"`);
		const response = await fetch(apiUrl, {
			method: "GET",
			headers: { Accept: "application/json" },
			next: { revalidate: 300 }, // Revalidate every 5 minutes
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({
				error: `Non-JSON error response: ${response.statusText}`,
			}));
			console.error(
				`[${functionName}] API call failed. URL: ${apiUrl}, Status: ${response.status}, Response:`,
				errorData
			);
			throw new Error(
				`Failed to fetch crypto listings: ${response.status} - ${
					errorData.error || response.statusText
				}`
			);
		}
		const data = await response.json();
		if (!data.data) {
			console.error(
				`[${functionName}] API response missing 'data' field. URL: ${apiUrl}, Response:`,
				data
			);
			throw new Error("Invalid API response structure from listings endpoint.");
		}
		return data.data.map((crypto: any) => ({
			id: crypto.id,
			symbol: crypto.symbol,
			name: crypto.name,
			price: crypto.quote.USD?.price || 0, // Fallback if USD quote is missing
			percentChange24h: crypto.quote.USD?.percent_change_24h || 0, // Fallback
		}));
	} catch (error) {
		console.error(
			`[${functionName}] CATCH BLOCK Error fetching from "${apiUrl}":`,
			error
		);
		throw error; // Re-throw the error to be handled by the caller
	}
}

export async function getFiatCurrencies(): Promise<FiatCurrency[]> {
	const functionName = "getFiatCurrencies";
	const baseUrl = getBaseUrl();
	const apiUrl = `${baseUrl}/api/coinmarketcap/fiat-map`;

	try {
		// console.log(`[${functionName}] Attempting to fetch from: "${apiUrl}"`);
		const response = await fetch(apiUrl, {
			method: "GET",
			headers: { Accept: "application/json" },
			next: { revalidate: 86400 }, // Revalidate once a day
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({
				error: `Non-JSON error response: ${response.statusText}`,
			}));
			console.error(
				`[${functionName}] API call failed. URL: ${apiUrl}, Status: ${response.status}, Response:`,
				errorData
			);
			throw new Error(
				`Failed to fetch fiat map: ${response.status} - ${
					errorData.error || response.statusText
				}`
			);
		}
		const data = await response.json();
		if (!data.data) {
			console.error(
				`[${functionName}] API response missing 'data' field. URL: ${apiUrl}, Response:`,
				data
			);
			throw new Error("Invalid API response structure from fiat-map endpoint.");
		}
		return data.data.map((fiat: any) => ({
			id: fiat.symbol,
			symbol: fiat.sign || fiat.symbol,
			name: fiat.name,
		}));
	} catch (error) {
		console.error(
			`[${functionName}] CATCH BLOCK Error fetching from "${apiUrl}":`,
			error
		);
		throw error;
	}
}

export async function convertCurrency(
	amount: number,
	fromCurrencySymbol: string,
	toCurrencySymbol: string
): Promise<ConversionResult> {
	const functionName = "convertCurrency";
	const baseUrl = getBaseUrl();
	const params = new URLSearchParams({
		amount: amount.toString(),
		symbol: fromCurrencySymbol,
		convert: toCurrencySymbol,
	});
	const apiUrl = `${baseUrl}/api/coinmarketcap/convert?${params.toString()}`;

	try {
		// console.log(`[${functionName}] Attempting to fetch from: "${apiUrl}"`);
		const response = await fetch(apiUrl, {
			method: "GET",
			headers: { Accept: "application/json" },
			cache: "no-store", // Conversions should not be cached heavily
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({
				error: `Non-JSON error response: ${response.statusText}`,
			}));
			console.error(
				`[${functionName}] API call failed. URL: ${apiUrl}, Status: ${response.status}, Response:`,
				errorData
			);
			throw new Error(
				errorData.error || `Conversion API request failed: ${response.status}`
			);
		}

		const apiResponse = await response.json();
		if (
			!apiResponse.data ||
			!apiResponse.data.quote ||
			!apiResponse.data.quote[toCurrencySymbol]
		) {
			console.error(
				`[${functionName}] Invalid API response structure. URL: ${apiUrl}, Response:`,
				apiResponse
			);
			throw new Error(
				`Target currency '${toCurrencySymbol}' or essential data not found in API response.`
			);
		}
		const quote = apiResponse.data.quote[toCurrencySymbol];

		const resultPrice = quote.price;
		const actualRate = amount === 0 ? 0 : resultPrice / amount;

		// Attempt to find more complete details if available, otherwise use symbols
		// This part might need enhancement if you fetch full currency lists elsewhere and can look them up
		const fromDetails: CryptoCurrency | FiatCurrency = {
			id: apiResponse.data.id?.toString() || fromCurrencySymbol,
			symbol: fromCurrencySymbol,
			name: apiResponse.data.name || fromCurrencySymbol,
			...(apiResponse.data.id && apiResponse.data.quote[fromCurrencySymbol] // If from is crypto and has quote
				? {
						price: apiResponse.data.quote[fromCurrencySymbol].price,
						percentChange24h:
							apiResponse.data.quote[fromCurrencySymbol].percent_change_24h,
				  }
				: {}),
		};
		const toDetails: CryptoCurrency | FiatCurrency = {
			id: toCurrencySymbol, // Assuming target fiat ID is its symbol
			symbol: toCurrencySymbol,
			name: toCurrencySymbol, // Placeholder name
			...(quote.price !== undefined // If target is crypto and has quote
				? { price: quote.price, percentChange24h: quote.percent_change_24h }
				: {}),
		};

		return {
			amount,
			fromCurrency: fromDetails,
			toCurrency: toDetails,
			rate: actualRate,
			result: resultPrice,
			timestamp: apiResponse.data.last_updated || new Date().toISOString(),
		};
	} catch (error) {
		console.error(
			`[${functionName}] CATCH BLOCK Error processing from "${apiUrl}":`,
			error
		);
		throw error;
	}
}
