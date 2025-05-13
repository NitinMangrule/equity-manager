import PositionSummary from "./PositionSummary";

export default function PositionsPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Trade Summary
        </h1>
        <PositionSummary />
      </div>
    </div>
  );
}
