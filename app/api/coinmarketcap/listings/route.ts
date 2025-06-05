// File: app/api/coinmarketcap/listings/route.ts
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

	// You can pass through query parameters from the original request if needed
	// For example, limit, start, convert, etc.
	const { searchParams } = new URL(request.url);
	const limit = searchParams.get("limit") || "100"; // Default to 100
	const convert = searchParams.get("convert") || "USD"; // Default to USD

	try {
		const response = await fetch(
			`${API_BASE_URL}/cryptocurrency/listings/latest?limit=${limit}&convert=${convert}`,
			{
				method: "GET",
				headers: {
					"X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
					Accept: "application/json",
				},
				// Consider Next.js caching or revalidation strategies here if appropriate
				// next: { revalidate: 300 } // e.g., revalidate every 5 minutes
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
			{ error: `Failed to fetch listings: ${error.message}` },
			{ status: 500 }
		);
	}
}
