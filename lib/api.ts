import { CryptoCurrency, FiatCurrency, ConversionResult } from "@/types";

// Utility to detect server-side
const isServer = typeof window === "undefined";

// CoinMarketCap API base URL
const COINMARKETCAP_API_URL = "https://pro-api.coinmarketcap.com/v1";

// User-Agent fallback
const USER_AGENT =
	"Mozilla/5.0 (compatible; MyCryptoApp/1.0; +https://example.com)";

// Helper function to perform fetch with consistent error handling
async function safeFetch<T>(url: string, options: RequestInit): Promise<T> {
	const response = await fetch(url, options);

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({
			error: `Non-JSON error response: ${response.statusText}`,
		}));
		console.error(
			`[safeFetch] API call failed. URL: ${url}, Status: ${response.status}, Response:`,
			errorData
		);
		throw new Error(
			`API request failed: ${response.status} - ${
				errorData.error || response.statusText
			}`
		);
	}

	const data = await response.json();
	return data;
}

export async function getCryptoCurrencies(): Promise<CryptoCurrency[]> {
	const functionName = "getCryptoCurrencies";

	const apiUrl = isServer
		? `${COINMARKETCAP_API_URL}/cryptocurrency/listings/latest`
		: "/api/coinmarketcap/listings";

	const fetchOptions: RequestInit = {
		method: "GET",
		headers: {
			Accept: "application/json",
			...(isServer && {
				"X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY || "",
				"User-Agent": USER_AGENT,
			}),
		},
		...(isServer ? {} : { next: { revalidate: 300 } }),
	};

	try {
		const data = await safeFetch<any>(apiUrl, fetchOptions);

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
			price: crypto.quote.USD?.price || 0,
			percentChange24h: crypto.quote.USD?.percent_change_24h || 0,
		}));
	} catch (error) {
		console.error(`[${functionName}] Error:`, error);
		throw error;
	}
}

export async function getFiatCurrencies(): Promise<FiatCurrency[]> {
	const functionName = "getFiatCurrencies";

	const apiUrl = isServer
		? `${COINMARKETCAP_API_URL}/fiat/map`
		: "/api/coinmarketcap/fiat-map";

	const fetchOptions: RequestInit = {
		method: "GET",
		headers: {
			Accept: "application/json",
			...(isServer && {
				"X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY || "",
				"User-Agent": USER_AGENT,
			}),
		},
		...(isServer ? {} : { next: { revalidate: 86400 } }),
	};

	try {
		const data = await safeFetch<any>(apiUrl, fetchOptions);

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
		console.error(`[${functionName}] Error:`, error);
		throw error;
	}
}

export async function convertCurrency(
	amount: number,
	fromCurrencySymbol: string,
	toCurrencySymbol: string
): Promise<ConversionResult> {
	const functionName = "convertCurrency";

	const apiUrl = isServer
		? `${COINMARKETCAP_API_URL}/tools/price-conversion?amount=${amount}&symbol=${fromCurrencySymbol}&convert=${toCurrencySymbol}`
		: `/api/coinmarketcap/convert?amount=${amount}&symbol=${fromCurrencySymbol}&convert=${toCurrencySymbol}`;

	const fetchOptions: RequestInit = {
		method: "GET",
		headers: {
			Accept: "application/json",
			...(isServer && {
				"X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY || "",
				"User-Agent": USER_AGENT,
			}),
		},
		...(isServer ? {} : { cache: "no-store" }),
	};

	try {
		const apiResponse = await safeFetch<any>(apiUrl, fetchOptions);

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

		const fromDetails: CryptoCurrency | FiatCurrency = {
			id: apiResponse.data.id?.toString() || fromCurrencySymbol,
			symbol: fromCurrencySymbol,
			name: apiResponse.data.name || fromCurrencySymbol,
			...(apiResponse.data.id && apiResponse.data.quote[fromCurrencySymbol]
				? {
						price: apiResponse.data.quote[fromCurrencySymbol].price,
						percentChange24h:
							apiResponse.data.quote[fromCurrencySymbol].percent_change_24h,
				  }
				: {}),
		};

		const toDetails: CryptoCurrency | FiatCurrency = {
			id: toCurrencySymbol,
			symbol: toCurrencySymbol,
			name: toCurrencySymbol,
			...(quote.price !== undefined
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
		console.error(`[${functionName}] Error:`, error);
		throw error;
	}
}
