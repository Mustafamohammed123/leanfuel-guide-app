
import React, { useState } from "react";
import { Search, TrendingUp, DollarSign, BarChart, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ResponsiveContainer, BarChart as RechartBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { SUBSCRIPTION_PLANS } from "@/contexts/SubscriptionContext";

// Mock subscription data
const subscriptionHistory = [
  { month: "Jan", revenue: 1200, subscribers: 120 },
  { month: "Feb", revenue: 1800, subscribers: 180 },
  { month: "Mar", revenue: 2400, subscribers: 240 },
  { month: "Apr", revenue: 3200, subscribers: 320 },
  { month: "May", revenue: 4500, subscribers: 450 },
  { month: "Jun", revenue: 5800, subscribers: 580 },
];

const subscriptionDistribution = [
  { name: "Monthly", value: 45 },
  { name: "Quarterly", value: 30 },
  { name: "Annual", value: 25 },
];

// Mock subscriber list
const subscribers = [
  { id: 1, name: "John Smith", email: "john@example.com", plan: "yearly", joined: "2025-01-15", status: "active" },
  { id: 2, name: "Emma Johnson", email: "emma@example.com", plan: "monthly", joined: "2025-02-22", status: "active" },
  { id: 3, name: "Michael Brown", email: "michael@example.com", plan: "quarterly", joined: "2025-01-05", status: "active" },
  { id: 4, name: "Olivia Davis", email: "olivia@example.com", plan: "yearly", joined: "2025-03-10", status: "active" },
  { id: 5, name: "William Wilson", email: "william@example.com", plan: "monthly", joined: "2025-02-18", status: "active" },
  { id: 6, name: "Sophia Martinez", email: "sophia@example.com", plan: "monthly", joined: "2025-03-01", status: "canceled" },
  { id: 7, name: "James Taylor", email: "james@example.com", plan: "quarterly", joined: "2025-01-30", status: "active" },
  { id: 8, name: "Charlotte Anderson", email: "charlotte@example.com", plan: "yearly", joined: "2025-02-05", status: "active" },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const SubscriptionManager = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubscribers = subscribers.filter(sub => 
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Subscription Management</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <Users className="h-4 w-4 mr-1" />
              Total Subscribers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">583</div>
            <p className="text-xs text-green-500 mt-1">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <DollarSign className="h-4 w-4 mr-1" />
              Monthly Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,832</div>
            <p className="text-xs text-green-500 mt-1">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.8%</div>
            <p className="text-xs text-green-500 mt-1">+2.1% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Subscription Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={subscriptionHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="subscribers" stroke="#8884d8" />
                  <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subscriptionDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {subscriptionDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plans</CardTitle>
          <div className="flex flex-wrap gap-3 mt-3">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <div key={plan.id} className="border rounded-md p-3 flex-1 min-w-[200px]">
                <div className="font-bold">{plan.name} - {plan.price}</div>
                <div className="text-sm text-gray-500">{plan.description}</div>
              </div>
            ))}
          </div>
        </CardHeader>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Subscriber List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search subscribers..."
              className="pl-8"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscribers.map(sub => (
                <TableRow key={sub.id}>
                  <TableCell className="font-medium">{sub.name}</TableCell>
                  <TableCell>{sub.email}</TableCell>
                  <TableCell>{sub.plan}</TableCell>
                  <TableCell>{new Date(sub.joined).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      sub.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {sub.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionManager;
