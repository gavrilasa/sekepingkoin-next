// File: app/api/coinmarketcap/convert/route.ts
import { NextRequest, NextResponse } from "next/server";

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const API_BASE_URL = "https://pro-api.coinmarketcap.com/v1";
export const dynamic = "force-dynamic"; // Ensures dynamic rendering

export async function GET(request: NextRequest) {
	if (!COINMARKETCAP_API_KEY) {
		return NextResponse.json(
			{ error: "CoinMarketCap API key not configured" },
			{ status: 500 }
		);
	}

	const { searchParams } = new URL(request.url);
	const amount = searchParams.get("amount");
	const symbol = searchParams.get("symbol"); // The symbol of the currency to convert from
	const convert = searchParams.get("convert"); // The symbol(s) of the currency to convert to

	if (!amount || !symbol || !convert) {
		return NextResponse.json(
			{ error: "Missing required query parameters: amount, symbol, convert" },
			{ status: 400 }
		);
	}

	const query = new URLSearchParams({
		amount,
		symbol,
		convert,
	});

	try {
		const response = await fetch(
			`${API_BASE_URL}/tools/price-conversion?${query.toString()}`,
			{
				method: "GET",
				headers: {
					"X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
					Accept: "application/json",
				},
				// cache: 'no-store' // Price conversions should usually not be cached for long
			}
		);

		const data = await response.json();

		if (!response.ok) {
			return NextResponse.json(
				{
					error: data.status?.error_message || `API error: ${response.status}`,
				},
				{ status: response.status }
			);
		}
		return NextResponse.json(data);
	} catch (error: any) {
		return NextResponse.json(
			{ error: `Failed to convert currency: ${error.message}` },
			{ status: 500 }
		);
	}
}
