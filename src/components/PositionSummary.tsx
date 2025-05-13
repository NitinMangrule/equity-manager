import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

export default function PositionSummary() {
  const positions = useSelector(
    (state: RootState) => state.transactions.positions
  );

  const hasPositions = Object.keys(positions).length > 0;

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <table className="w-full border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <tr>
            <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
              Stock
            </th>
            <th className="px-6 py-3 text-left font-semibold uppercase tracking-wider">
              Net Position
            </th>
          </tr>
        </thead>
        <tbody>
          {hasPositions ? (
            Object.entries(positions).map(([code, qty], index) => (
              <tr
                key={code}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                } hover:bg-blue-100 transition-colors`}
              >
                <td className="px-6 py-3 text-gray-800 font-medium">{code}</td>
                <td className="px-6 py-3 text-gray-800 font-medium">{qty}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={2}
                className="px-6 py-3 text-center text-gray-500 font-medium"
              >
                No trade data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
