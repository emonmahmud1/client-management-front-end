"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrencySymbol } from "@/store/slices/app-slice";

const SettingsPage = () => {
  const dispatch = useAppDispatch();
  const currency = useAppSelector((state) => state.app.currencySymbol);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-medium">Currency Symbol</p>
          <div className="flex gap-2">
            <Button
              variant={currency === "৳" ? "default" : "outline"}
              onClick={() => dispatch(setCurrencySymbol("৳"))}
            >
              ৳ BDT
            </Button>
            <Button
              variant={currency === "$" ? "default" : "outline"}
              onClick={() => dispatch(setCurrencySymbol("$"))}
            >
              $ USD
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
