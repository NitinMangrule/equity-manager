import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import TransactionsPage from "./components/TransactionsPage";
import PositionsPage from "./components/PositionsPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col w-full max-w-screen-2xl mx-auto">
        <header className="bg-blue-600 text-white py-4 shadow-md">
          <div className="flex items-center justify-between px-4">
            <div className="text-xl font-bold">Equity Manager</div>
            <nav className="flex space-x-8">
              <NavLink
                to="/transactions"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md ${
                    isActive ? "bg-white text-blue-600" : "hover:bg-blue-500"
                  }`
                }
              >
                Transactions
              </NavLink>
              <NavLink
                to="/positions"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-md ${
                    isActive ? "bg-white text-blue-600" : "hover:bg-blue-500"
                  }`
                }
              >
                Positions
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="flex-grow w-full py-8">
          <Routes>
            <Route path="/transactions" element={<TransactionsPage />} />
            <Route path="/positions" element={<PositionsPage />} />
            <Route path="*" element={<TransactionsPage />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-4 text-center w-full h-[30px]"></footer>
      </div>
    </Router>
  );
}
