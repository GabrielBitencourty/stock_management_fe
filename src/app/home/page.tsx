import DashboardCard from "@/components/logedComponents/DashboardCard";
import Navbar from "@/components/logedComponents/navbar";
import SideMenu from "@/components/logedComponents/sideMenu";
import { Card } from "@/components/ui/card";
import {
    TrendingUp,
    Receipt,
    Clock,
    Wallet,
} from "lucide-react";

export default function HomePage() {

    const transactions = [
    {
        id: "#TRX-001",
        product: "Premium Plan",
        date: "11/08/2026",
        time: "14:32",
        paymentMethod: "Credit Card",
        productValue: "$ 89,90",
        paidValue: "$ 89,90",
        status: "Paid",
    },
    {
        id: "#TRX-002",
        product: "Basic Plan",
        date: "11/08/2026",
        time: "13:18",
        paymentMethod: "PIX",
        productValue: "$ 49,90",
        paidValue: "$ 49,90",
        status: "Paid",
    },
    {
        id: "#TRX-003",
        product: "Premium Plan",
        date: "11/08/2026",
        time: "11:47",
        paymentMethod: "Debit Card",
        productValue: "$ 89,90",
        paidValue: "$ 89,90",
        status: "Paid",
    },
    {
        id: "#TRX-004",
        product: "Consultancy Service",
        date: "10/08/2026",
        time: "17:25",
        paymentMethod: "PIX",
        productValue: "$ 250,00",
        paidValue: "$ 250,00",
        status: "Pending",
    },
    {
        id: "#TRX-005",
        product: "Basic Plan",
        date: "10/08/2026",
        time: "15:10",
        paymentMethod: "Credit Card",
        productValue: "$ 49,90",
        paidValue: "$ 49,90",
        status: "Paid",
    },
];

    return (
        <div className="min-h-screen w-full bg-slate-50">
            <SideMenu />
            <Navbar />

            <main className="pt-20 lg:pl-72">
                <div className="flex flex-col gap-6 p-6">

                    <div>
                        <h2 className="text-2xl tracking-tight text-(--font-blue)">
                            Welcome! Gabriel Bitencourt
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Your personal dashboard
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <DashboardCard
                            title="Winnings"
                            value="$ 12.450,00"
                            description="+12,5% this month"
                            icon={TrendingUp}
                            variant="success"
                        />

                        <DashboardCard
                            title="Total Expenses"
                            value="$ 4.280,00"
                            description="-8,2% this month"
                            icon={Receipt}
                            variant="danger"
                        />

                        <DashboardCard
                            title="To Receive"
                            value="$ 3.850,00"
                            description="+5,3% this month"
                            icon={Wallet}
                            variant="info"
                        />

                        <DashboardCard
                            title="Pending payments"
                            value="8"
                            description="3 winning today"
                            icon={Clock}
                            variant="warning"
                        />
                    </div>

                    <Card className="min-h-87.5 p-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-800">
                                Last Transactions
                            </h3>

                            <p className="mt-1 text-sm text-slate-500">
                                Check your latest sales and payments.
                            </p>
                        </div>

                        <div className="mt-6 overflow-x-auto">
    <table className="w-full min-w-225 text-sm">
        <thead>
            <tr className="border-b border-slate-200 text-left">
                <th className="px-4 py-3 font-medium text-slate-500">
                    ID
                </th>

                <th className="px-4 py-3 font-medium text-slate-500">
                    Product
                </th>

                <th className="px-4 py-3 font-medium text-slate-500">
                    Data
                </th>

                <th className="px-4 py-3 font-medium text-slate-500">
                    Time
                </th>

                <th className="px-4 py-3 font-medium text-slate-500">
                    Payment
                </th>

                <th className="px-4 py-3 font-medium text-slate-500">
                    Product Value
                </th>

                <th className="px-4 py-3 font-medium text-slate-500">
                    Paid Value
                </th>

                <th className="px-4 py-3 font-medium text-slate-500">
                    Status
                </th>
            </tr>
        </thead>

        <tbody>
            {transactions.map((transaction) => (
                <tr
                    key={transaction.id}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                >
                    <td className="px-4 py-4 font-medium text-slate-700">
                        {transaction.id}
                    </td>

                    <td className="px-4 py-4 text-slate-700">
                        {transaction.product}
                    </td>

                    <td className="px-4 py-4 text-slate-500">
                        {transaction.date}
                    </td>

                    <td className="px-4 py-4 text-slate-500">
                        {transaction.time}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                        {transaction.paymentMethod}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                        {transaction.productValue}
                    </td>

                    <td className="px-4 py-4 font-medium text-slate-800">
                        {transaction.paidValue}
                    </td>

                    <td className="px-4 py-4">
                        <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                transaction.status === "Paid"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                            {transaction.status}
                        </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>

                </div>
            </main>
        </div>
    );
}