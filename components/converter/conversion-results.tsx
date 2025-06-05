"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ConversionResult, ConversionType } from "@/types";
import { formatCurrency, cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

interface ConversionResultsProps {
  result: ConversionResult;
  conversionType: ConversionType;
}

export function ConversionResults({ result, conversionType }: ConversionResultsProps) {
  const { amount, fromCurrency, toCurrency, rate, result: convertedAmount } = result;
  const [showAnimation, setShowAnimation] = useState(false);

  // Reset and trigger animation when result changes
  useEffect(() => {
    setShowAnimation(true);
    const timer = setTimeout(() => setShowAnimation(false), 1000);
    return () => clearTimeout(timer);
  }, [result]);

  const fromSymbol = conversionType === "crypto-to-fiat" 
    ? fromCurrency.symbol 
    : fromCurrency.symbol;
    
  const toSymbol = conversionType === "crypto-to-fiat"
    ? toCurrency.symbol
    : toCurrency.symbol;

  // Determine if crypto is trending up or down (for crypto-to-fiat)
  const isTrendingUp = conversionType === "crypto-to-fiat" 
    ? rate > 0 // In real implementation, use percentChange24h from API
    : rate > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-6"
    >
      <Card className="overflow-hidden border-0 bg-gradient-to-br from-muted/50 to-background">
        <CardContent className="p-6">
          <div className="mb-4">
            <h3 className="text-lg font-medium text-foreground/80">Conversion Result</h3>
          </div>
          
          <div className="space-y-4">
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: showAnimation ? [1, 1.02, 1] : 1 }}
              transition={{ duration: 0.3 }}
              className="text-3xl font-bold text-center mb-4"
            >
              {formatCurrency(convertedAmount, toSymbol)}
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">You send</p>
                <p className="text-lg font-medium">
                  {formatCurrency(amount, fromSymbol)}
                </p>
              </div>
              
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">You get</p>
                <p className="text-lg font-medium">
                  {formatCurrency(convertedAmount, toSymbol)}
                </p>
              </div>
            </div>
            
            <div className="pt-2 border-t border-border/40">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Exchange Rate
                </div>
                <div className="flex items-center font-medium">
                  <span>
                    1 {fromSymbol} = {formatCurrency(rate, toSymbol)}
                  </span>
                  <span 
                    className={cn(
                      "ml-2 flex items-center text-xs",
                      isTrendingUp ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {isTrendingUp ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    24h
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}