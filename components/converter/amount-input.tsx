"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AmountInputProps {
  value: number;
  onChange: (value: number) => void;
  currencySymbol: string;
  label?: string;
}

export function AmountInput({ value, onChange, currencySymbol, label }: AmountInputProps) {
  return (
    <div className="space-y-2">
      {label && <Label htmlFor="amount">{label}</Label>}
      <div className="relative">
        <Input
          type="number"
          id="amount"
          value={value === 0 ? "" : value}
          onChange={(e) => {
            const value = parseFloat(e.target.value);
            onChange(isNaN(value) ? 0 : value);
          }}
          placeholder="Enter amount"
          min="0"
          step="any"
          className="pr-12"
        />
        {currencySymbol && (
          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-muted-foreground">
            {currencySymbol}
          </div>
        )}
      </div>
    </div>
  );
}