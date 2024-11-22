"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Calculator, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface Investor {
  id: number;
  name: string;
  contribution: number;
}

export default function ProfitSharingForm() {
  const [supplyId, setSupplyId] = useState("");
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalProfit, setTotalProfit] = useState(0);
  const [date, setDate] = useState("");
  const [investors, setInvestors] = useState<Investor[]>([]);
  const [error, setError] = useState("");
  const [results, setResults] = useState<{ name: string; profit: number }[]>(
    []
  );
  const [ownerProfit, setOwnerProfit] = useState(0);

  useEffect(() => {
    const storedInvestors = localStorage.getItem("investors");
    if (storedInvestors) {
      setInvestors(JSON.parse(storedInvestors));
    } else {
      setInvestors([{ id: 1, name: "", contribution: 0 }]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("investors", JSON.stringify(investors));
  }, [investors]);

  // useEffect(() => {
  //   calculateProfitShares();
  // }, [totalInvestment, totalProfit, investors]);

  const addInvestor = () => {
    setInvestors([
      ...investors,
      { id: investors.length + 1, name: "", contribution: 0 },
    ]);
  };

  const removeInvestor = (id: number) => {
    setInvestors(investors.filter((investor) => investor.id !== id));
  };

  const updateInvestor = (
    id: number,
    field: "name" | "contribution",
    value: string | number
  ) => {
    setInvestors(
      investors.map((investor) =>
        investor.id === id ? { ...investor, [field]: value } : investor
      )
    );
  };

  const calculateTotalInvestment = () => {
    const total = investors.reduce(
      (sum, investor) => sum + investor.contribution,
      0
    );
    setTotalInvestment(total);
  };

  const calculateProfitShares = () => {
    const totalContribution = investors.reduce(
      (sum, investor) => sum + investor.contribution,
      0
    );

    if (totalContribution !== totalInvestment) {
      setError("Total contributions must equal total investment");
      return;
    }

    setError("");

    const investorShares = investors.map((investor) => {
      const grossProfit =
        (investor.contribution / totalInvestment) * totalProfit;
      const netProfit = grossProfit * 0.5; // 50% of the profit goes to the investor
      return {
        name: investor.name,
        profit: netProfit,
      };
    });

    const totalOwnerProfit = totalProfit * 0.5; // 50% of the total profit goes to the owner
    setOwnerProfit(totalOwnerProfit);
    setResults(investorShares);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateProfitShares();
  };

  return (
    <div className="container mx-auto py-10">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>New Supply Details</CardTitle>
          <CardDescription>
            Log new supply details for profit sharing
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="supplyId">Supply ID</Label>
                <Input
                  id="supplyId"
                  value={supplyId}
                  onChange={(e) => setSupplyId(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="totalInvestment">Total Investment</Label>
                <Input
                  id="totalInvestment"
                  type="number"
                  value={totalInvestment || ""}
                  onChange={(e) => setTotalInvestment(Number(e.target.value))}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalProfit">Total Profit</Label>
                <Input
                  id="totalProfit"
                  type="number"
                  value={totalProfit || ""}
                  onChange={(e) => setTotalProfit(Number(e.target.value))}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Investor Details</Label>
              {investors.map((investor) => (
                <div key={investor.id} className="flex items-center space-x-2">
                  <Input
                    placeholder="Investor Name"
                    value={investor.name}
                    onChange={(e) =>
                      updateInvestor(investor.id, "name", e.target.value)
                    }
                    required
                  />
                  <Input
                    placeholder="Contribution"
                    type="number"
                    value={investor.contribution || ""}
                    onChange={(e) =>
                      updateInvestor(
                        investor.id,
                        "contribution",
                        Number(e.target.value)
                      )
                    }
                    required
                  />
                  {investors.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="p-2"
                      onClick={() => removeInvestor(investor.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={addInvestor}
                  className="w-full"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Investor
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={calculateTotalInvestment}
                  className="w-full"
                >
                  <Calculator className="mr-2 h-4 w-4" /> Set Total
                </Button>
              </div>
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              Calculate and Save
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          {results.length > 0 && (
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-2">Profit Shares:</h3>
              <ul className="space-y-2">
                {results.map((result, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{result.name}:</span>
                    <span>${result.profit.toFixed(2)}</span>
                  </li>
                ))}
                <li className="flex justify-between font-bold">
                  <span>Jonayet:</span>
                  <span>${ownerProfit.toFixed(2)}</span>
                </li>
              </ul>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
