import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTransaction } from "../store/transactionsSlice";
import type { RootState } from "../store/store";
import { MOCK_SECURITIES } from "../constants";
import RadioGroup from "./RadioGroup";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";

export default function TransactionForm() {
  const dispatch = useDispatch();
  const positions = useSelector(
    (state: RootState) => state.transactions.positions
  );

  const generateUniqueTradeId = useCallback(
    () => Date.now() + Math.floor(Math.random() * 1000),
    []
  );

  const [form, setForm] = useState({
    tradeId: generateUniqueTradeId(),
    securityCode: "",
    quantity: 0,
    action: "INSERT" as "INSERT" | "CANCEL",
    type: "" as "Buy" | "Sell" | "",
  });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]:
          name === "quantity" || name.includes("Id") ? Number(value) : value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (form.action === "CANCEL" && !positions[form.securityCode]) {
        alert("The selected stock does not exist in your positions.");
        return;
      }

      dispatch(addTransaction(form));

      alert(
        form.action === "INSERT"
          ? `${form.type} Trade recorded for ${form.securityCode} with ${form.quantity} units`
          : `Trade cancelled for ${form.securityCode}`
      );

      setForm({
        tradeId: generateUniqueTradeId(),
        securityCode: "",
        quantity: 0,
        type: "",
        action: "INSERT",
      });
    },
    [dispatch, form, generateUniqueTradeId, positions]
  );

  const isSubmitDisabled =
    (form.action === "INSERT" && (form.quantity === 0 || !form.type)) ||
    !form.securityCode;

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white shadow rounded p-6 space-y-6"
      >
        <div className="space-y-4">
          <RadioGroup
            label="What would you like to do today?"
            name="action"
            options={[
              { value: "INSERT", label: "Record a new trade" },
              { value: "CANCEL", label: "Cancel a previous trade" },
            ]}
            selectedValue={form.action}
            onChange={handleChange}
          />

          <SelectInput
            label="Choose your Stock"
            name="securityCode"
            value={form.securityCode}
            options={[
              { value: "", label: "Select a Stock" },
              ...MOCK_SECURITIES.map(({ code, name }) => ({
                value: code,
                label: name,
              })),
            ]}
            onChange={handleChange}
            required
          />

          {form.action === "INSERT" && (
            <>
              <TextInput
                label="How many units are we dealing with?"
                name="quantity"
                type="number"
                placeholder="Quantity"
                value={form.quantity}
                onChange={handleChange}
                required
              />

              <SelectInput
                label="Are you buying or selling?"
                name="type"
                value={form.type}
                options={[
                  { value: "", label: "Select Type" },
                  { value: "Buy", label: "Buy" },
                  { value: "Sell", label: "Sell" },
                ]}
                onChange={handleChange}
                required
              />
            </>
          )}
        </div>

        <button
          type="submit"
          className={`w-full bg-blue-500 text-white font-medium py-2 px-4 rounded shadow ${
            isSubmitDisabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-blue-600"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
          disabled={isSubmitDisabled}
        >
          Execute Transaction
        </button>
      </form>
    </div>
  );
}
