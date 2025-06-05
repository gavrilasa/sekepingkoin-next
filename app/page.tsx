import { Suspense } from 'react';
import { Metadata } from 'next';
import { ConverterCard } from '@/components/converter/converter-card';
import { getCryptoCurrencies, getFiatCurrencies } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

export const metadata: Metadata = {
  title: 'Crypto-Fiat Converter',
  description: 'Convert between cryptocurrencies and fiat currencies in real-time',
};

export default async function Home() {
  // Fetch data at request time
  const [cryptocurrencies, fiatCurrencies] = await Promise.all([
    getCryptoCurrencies(),
    getFiatCurrencies(),
  ]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-chart-2">
            Crypto-Fiat Converter
          </h1>
          <p className="text-muted-foreground text-lg">
            Instantly convert between cryptocurrencies and fiat currencies with real-time exchange rates
          </p>
        </div>

        <Suspense fallback={<ConverterSkeleton />}>
          <ConverterCard 
            cryptocurrencies={cryptocurrencies}
            fiatCurrencies={fiatCurrencies}
          />
        </Suspense>

        <div className="mt-12 pt-6 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>
            Data provided by CoinMarketCap. Rates are updated in real-time.
          </p>
        </div>
      </div>
    </main>
  );
}

function ConverterSkeleton() {
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Skeleton className="h-[500px] w-full rounded-xl" />
    </div>
  );
}