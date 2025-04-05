export function Checkout({ activeTab, setActiveTab }: { activeTab: "balance" | "transactions", setActiveTab: (tab: "balance" | "transactions") => void }) {
    return (
        <div className="flex justify-center items-center gap-8 mb-1">
            <button 
                className={`font-medium transition-colors ${activeTab === "balance" ? "text-blue-500" : "text-gray-600 hover:text-blue-500"}`}
                onClick={() => setActiveTab("balance")}
            >
                Balance
            </button>
            <button 
                className={`font-medium transition-colors ${activeTab === "transactions" ? "text-blue-500" : "text-gray-600 hover:text-blue-500"}`}
                onClick={() => setActiveTab("transactions")}
            >
                Transactions
            </button>
        </div>
    )
}