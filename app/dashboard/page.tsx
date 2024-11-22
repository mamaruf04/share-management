"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const AdminDashboard = () => {
  const initCycles = [
    {
      id: 1,
      startDate: "2023-01-01",
      endDate: "2023-02-01",
      totalInvestment: 1000,
      totalProfit: 500,
    },
    {
      id: 2,
      startDate: "2023-03-01",
      endDate: "2023-04-01",
      totalInvestment: 2000,
      totalProfit: 1000,
    },
  ];

  const [cycles, setCycles] = useState(initCycles);
  const [newCycle, setNewCycle] = useState({
    startDate: "",
    endDate: "",
  });

  const handleCreateCycle = async (e: any) => {
    e.preventDefault();
    // Add cycle creation logic here
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Business Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium">Total Investments</h3>
                <p className="text-2xl font-bold">$50,000</p>
              </div>
              <div>
                <h3 className="font-medium">Total Profit</h3>
                <p className="text-2xl font-bold text-green-300">$15,000</p>
              </div>
              <div>
                <h3 className="font-medium">Active Investors</h3>
                <p className="text-2xl font-bold">12</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create Supply Cycle</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateCycle} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  placeholder="Start Date"
                  value={newCycle.startDate}
                  onChange={(e) =>
                    setNewCycle({ ...newCycle, startDate: e.target.value })
                  }
                />
                <Input
                  type="date"
                  placeholder="End Date"
                  value={newCycle.endDate}
                  onChange={(e) =>
                    setNewCycle({ ...newCycle, endDate: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                Create Cycle
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Supply Cycles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cycles.map((cycle: any) => (
                <div key={cycle.id} className="p-4 border rounded">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Cycle #{cycle.id}</p>
                      <p className="text-sm text-gray-500">
                        {cycle.startDate} - {cycle.endDate}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">
                        Total Investment: ${cycle.totalInvestment}
                      </p>
                      <p className="text-green-300">
                        Total Profit: ${cycle.totalProfit}
                      </p>
                    </div>
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

export default AdminDashboard;
