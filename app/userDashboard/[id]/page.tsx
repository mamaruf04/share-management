"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

const InvestorDashboard = () => {
  const initInvestments = [
    {
      id: 1,
      amount: 1000,
      startDate: "24 Dec 2022",
      endDate: "24 Jan 2023",
      profit: 500,
    },
    {
      id: 2,
      amount: 2000,
      startDate: "5 Feb 2023",
      endDate: "5 Mar 2023",
      profit: 1000,
    },
  ];

  const [investments, setInvestments] = useState(initInvestments);
  const [newInvestment, setNewInvestment] = useState({
    amount: "",
    supplyCycleId: "",
  });

  const handleInvestment = async (e: any) => {
    e.preventDefault();
    // Add investment logic here
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Investments Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 border rounded items-center justify-center">
                <div>
                  <h3 className="font-medium">Total Investment</h3>
                  <p className="text-2xl font-bold">4,000 RM</p>
                </div>
                <div>
                  <h3 className="font-medium">Total Profit</h3>
                  <p className="text-2xl font-bold">700 RM</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4 border rounded items-center justify-center">
                <div>
                  <h3 className="font-medium">Total Cycle</h3>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <div>
                  <h3 className="font-medium">Total Lose</h3>
                  <p className="text-2xl font-bold">00 RM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* current investment */}
        <Card className="relative">
          <CardHeader>
            <CardTitle>Current Investments</CardTitle>
          </CardHeader>
          <span className="h-4 w-4 rounded-full bg-green-500 absolute top-3 right-3"></span>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 border rounded items-center justify-center">
                <div>
                  <h3 className="font-medium">Invest</h3>
                  <p className="text-2xl font-bold">4,000 RM</p>
                </div>
                <div>
                  <h3 className="font-medium">Running Cycle</h3>
                  <p className="text-2xl font-bold">5</p>
                </div>
              </div>
              <p className=" text-gray-400 text-base w-full mx-auto">
                {"5 Mar 2023"} - {"5 Apr 2023"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* <Card>
          <CardHeader>
            <CardTitle>New Investment</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInvestment} className="space-y-4">
              <div>
                <Input
                  type="number"
                  placeholder="Investment Amount"
                  value={newInvestment.amount}
                  onChange={(e) =>
                    setNewInvestment({
                      ...newInvestment,
                      amount: e.target.value,
                    })
                  }
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                Submit Investment
              </Button>
            </form>
          </CardContent>
        </Card> */}

        <Card>
          <CardHeader>
            <CardTitle>Investment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investments.map((investment: any) => (
                <div
                  key={investment.id}
                  className="flex flex-wrap md:flex-nowrap items-center p-4 border rounded "
                >
                  <div className="flex flex-row md:flex-col justify-between w-full">
                    <p className="font-medium text-lg">
                      Invest:{" "}
                      <span className="text-green-300">
                        {investment.amount} RM
                      </span>
                    </p>
                    {/* <p className="text-sm text-gray-500">{investment.startDate} - {investment.endDate}</p> */}
                  </div>
                  <div className="w-full">
                    <p className="font-medium text-lg mb-2">
                      Profit:{" "}
                      <span className="text-blue-300">
                        {investment.profit} RM
                      </span>{" "}
                      |{" "}
                      <span className="text-purple-300">
                        {" "}
                        {investment.profit} BDT
                      </span>
                    </p>
                    <p className="text-base text-gray-400">
                      Convert Rate: 1 RM = 29 BDT
                    </p>
                    <p className=" text-gray-400 text-base">
                      {investment.startDate} - {investment.endDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InvestorDashboard;
