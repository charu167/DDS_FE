"use client";

import { useState } from "react";
import axios from "axios";

const ParallelTransactionsPage = () => {
  const [transaction1, setTransaction1] = useState({
    sender_id: "",
    sender_region: "",
    receiver_id: "",
    receiver_region: "",
    amount: "",
    description: "",
  });

  const [transaction2, setTransaction2] = useState({
    sender_id: "",
    sender_region: "",
    receiver_id: "",
    receiver_region: "",
    amount: "",
    description: "",
  });

  const [responseDetails, setResponseDetails] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    transactionSetter: React.Dispatch<React.SetStateAction<any>>
  ) => {
    const { name, value } = e.target;
    // @ts-ignore
    transactionSetter((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setResponseDetails([]);
    const timestamps: any[] = [];

    try {
      const responses = await Promise.allSettled([
        axios.post("http://127.0.0.1:5000/process_payment", transaction1).then((res) => {
          timestamps.push({
            transaction: "Transaction 1",
            startedAt: new Date().toISOString(),
            finishedAt: new Date().toISOString(),
            // @ts-ignore
            message: res.data.message || "Success",
          });
          return res;
        }),
        axios.post("http://127.0.0.1:5000/process_payment", transaction2).then((res) => {
          timestamps.push({
            transaction: "Transaction 2",
            startedAt: new Date().toISOString(),
            finishedAt: new Date().toISOString(),
            // @ts-ignore
            message: res.data.message || "Success",
          });
          return res;
        }),
      ]);

      const errorDetails = responses.map((res, index) => {
        if (res.status === "rejected") {
          timestamps[index].message =
            res.reason.response?.data?.error || "Error occurred during processing.";
        }
        return timestamps[index];
      });

      setResponseDetails(timestamps);
    } catch (err) {
      setResponseDetails([
        {
          transaction: "Error",
          startedAt: "-",
          finishedAt: "-",
          message: "An unexpected error occurred.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-8">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-6xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Parallel Transactions
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Enter details for two transactions and submit them simultaneously.
        </p>

        {/* Left and Right Forms */}
        <div className="flex border-t-2 border-gray-200 pt-8">
          {/* Left Side: Transaction 1 */}
          <div className="w-1/2 pr-4 border-r-2 border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Transaction 1
            </h2>
            <TransactionForm
              transaction={transaction1}
              onChange={(e) => handleChange(e, setTransaction1)}
            />
          </div>

          {/* Right Side: Transaction 2 */}
          <div className="w-1/2 pl-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Transaction 2
            </h2>
            <TransactionForm
              transaction={transaction2}
              onChange={(e) => handleChange(e, setTransaction2)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Submit Transactions"}
          </button>
        </div>

        {/* Response Details */}
        {responseDetails.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Transaction Details:
            </h3>
            <ul className="space-y-4">
              {responseDetails.map((detail, index) => (
                <li
                  key={index}
                  className="p-4 border border-gray-300 rounded-lg bg-gray-50 shadow"
                >
                  <p>
                    <strong>{detail.transaction}</strong>
                  </p>
                  <p>
                    <strong>Started At:</strong> {detail.startedAt}
                  </p>
                  <p>
                    <strong>Finished At:</strong> {detail.finishedAt}
                  </p>
                  <p>
                    <strong>Message:</strong> {detail.message}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

// Transaction Form Component
const TransactionForm = ({
  transaction,
  onChange,
}: {
  transaction: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Sender ID</label>
      <input
        type="text"
        name="sender_id"
        value={transaction.sender_id}
        onChange={onChange}
        className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
        placeholder="Enter Sender ID"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Sender Region</label>
      <select
        name="sender_region"
        value={transaction.sender_region}
        onChange={onChange}
        className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
        required
      >
        <option value="">Select Region</option>
        <option value="us">US</option>
        <option value="eu">EU</option>
        <option value="asia">Asia</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Receiver ID</label>
      <input
        type="text"
        name="receiver_id"
        value={transaction.receiver_id}
        onChange={onChange}
        className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
        placeholder="Enter Receiver ID"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Receiver Region</label>
      <select
        name="receiver_region"
        value={transaction.receiver_region}
        onChange={onChange}
        className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
        required
      >
        <option value="">Select Region</option>
        <option value="us">US</option>
        <option value="eu">EU</option>
        <option value="asia">Asia</option>
      </select>
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Amount</label>
      <input
        type="text"
        name="amount"
        value={transaction.amount}
        onChange={onChange}
        className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
        placeholder="Enter Amount"
        required
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700">Description</label>
      <input
        type="text"
        name="description"
        value={transaction.description}
        onChange={onChange}
        className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
        placeholder="Enter Description"
        required
      />
    </div>
  </div>
);

export default ParallelTransactionsPage;
