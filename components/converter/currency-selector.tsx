"use client";

import { useState, useEffect, useMemo } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CryptoCurrency, FiatCurrency } from "@/types";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CurrencySelectorProps {
  currencies: CryptoCurrency[] | FiatCurrency[];
  selectedCurrency: string;
  onSelect: (currency: string) => void;
  label?: string;
  type: "crypto" | "fiat";
}

export function CurrencySelector({ 
  currencies, 
  selectedCurrency, 
  onSelect, 
  label,
  type
}: CurrencySelectorProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const sortedCurrencies = useMemo(() => {
    return [...currencies].sort((a, b) => a.name.localeCompare(b.name));
  }, [currencies]);

  const filteredCurrencies = useMemo(() => {
    if (!searchQuery) return sortedCurrencies;
    
    const query = searchQuery.toLowerCase();
    return sortedCurrencies.filter(
      currency => 
        currency.name.toLowerCase().includes(query) || 
        currency.symbol.toLowerCase().includes(query)
    );
  }, [sortedCurrencies, searchQuery]);

  const selectedCurrencyDetails = useMemo(() => {
    return currencies.find(c => 
      type === "crypto" 
        ? (c as CryptoCurrency).symbol === selectedCurrency
        : (c as FiatCurrency).id === selectedCurrency
    );
  }, [currencies, selectedCurrency, type]);

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal h-10"
          >
            {selectedCurrencyDetails ? (
              <div className="flex items-center">
                <span className="font-medium mr-1">
                  {type === "crypto" 
                    ? (selectedCurrencyDetails as CryptoCurrency).symbol
                    : (selectedCurrencyDetails as FiatCurrency).symbol}
                </span>
                <span className="text-muted-foreground truncate">
                  {selectedCurrencyDetails.name}
                </span>
              </div>
            ) : (
              "Select currency..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <Command>
            <CommandInput 
              placeholder={`Search ${type === "crypto" ? "cryptocurrency" : "currency"}...`}
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>No currency found.</CommandEmpty>
              <CommandGroup>
                {filteredCurrencies.map((currency) => {
                  const value = type === "crypto" 
                    ? (currency as CryptoCurrency).symbol
                    : (currency as FiatCurrency).id;
                  
                  const isSelected = value === selectedCurrency;
                  
                  return (
                    <CommandItem
                      key={value}
                      value={value}
                      onSelect={() => {
                        onSelect(value);
                        setOpen(false);
                      }}
                      className={cn(
                        "flex items-center gap-2",
                        isSelected ? "bg-accent" : ""
                      )}
                    >
                      <div className="flex items-center flex-1">
                        <span className="font-medium mr-2">
                          {currency.symbol}
                        </span>
                        <span>{currency.name}</span>
                      </div>
                      {type === "crypto" && (
                        <span 
                          className={cn(
                            "text-xs",
                            (currency as CryptoCurrency).percentChange24h >= 0 
                              ? "text-green-500"
                              : "text-red-500"
                          )}
                        >
                          {(currency as CryptoCurrency).percentChange24h >= 0 ? "+" : ""}
                          {(currency as CryptoCurrency).percentChange24h.toFixed(2)}%
                        </span>
                      )}
                      <Check 
                        className={cn(
                          "ml-auto h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}