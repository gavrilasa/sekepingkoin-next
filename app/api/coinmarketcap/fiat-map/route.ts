// File: app/api/coinmarketcap/fiat-map/route.ts
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

	try {
		const response = await fetch(`${API_BASE_URL}/fiat/map`, {
			method: "GET",
			headers: {
				"X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
				Accept: "application/json",
			},
			// next: { revalidate: 86400 } // e.g., revalidate once a day
		});

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
			{ error: `Failed to fetch fiat map: ${error.message}` },
			{ status: 500 }
		);
	}
}
