import TransactionForm from "./TransactionForm";

export default function TransactionsPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Transaction Form
        </h1>
        <TransactionForm />
      </div>
    </div>
  );
}
