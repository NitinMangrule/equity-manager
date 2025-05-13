import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Transaction = {
  tradeId: number;
  securityCode: string;
  quantity: number;
  action: "INSERT" | "CANCEL";
  type: "Buy" | "Sell" | "";
};

type PositionMap = Record<string, number>;

interface TransactionsState {
  transactions: Record<number, Transaction>;
  positions: PositionMap;
}

const initialState: TransactionsState = {
  transactions: {},
  positions: {},
};

const updatePositionForTransaction = (
  positions: PositionMap,
  transaction: Transaction,
  isAdding: boolean
) => {
  const quantity =
    transaction.type === "Buy" ? transaction.quantity : -transaction.quantity;
  const adjustment = isAdding ? quantity : -quantity;

  positions[transaction.securityCode] =
    (positions[transaction.securityCode] || 0) + adjustment;

  if (positions[transaction.securityCode] === 0) {
    delete positions[transaction.securityCode];
  }
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      const tx = action.payload;

      if (tx.action === "CANCEL" && state.transactions[tx.tradeId]) {
        const existingTransaction = state.transactions[tx.tradeId];
        updatePositionForTransaction(
          state.positions,
          existingTransaction,
          false
        );
        delete state.transactions[tx.tradeId];
      } else if (tx.action === "INSERT") {
        state.transactions[tx.tradeId] = tx;
        updatePositionForTransaction(state.positions, tx, true);
      }
    },
  },
});

export const { addTransaction } = transactionsSlice.actions;
export default transactionsSlice.reducer;
export type { Transaction };
