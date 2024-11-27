"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

const PaymentProcessing = () => {
  const [formData, setFormData] = useState({
    sender_id: "",
    sender_region: "",
    receiver_id: "",
    receiver_region: "",
    amount: "",
    description: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Only allow numeric input for specific fields
    if (["sender_id", "receiver_id", "amount"].includes(name) && value && isNaN(Number(value))) {
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage("");
    try {
      const response = await axios.post("http://127.0.0.1:5000/process_payment", formData);

      // @ts-ignore
      setResponseMessage(response.data.message || "Transaction successful!");
    } catch (error: any) {
      setResponseMessage(error.response?.data?.error || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-8">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Payment Processing
        </h2>
        <p className="text-gray-700 text-center mb-8">
          Enter the details below to process a payment.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sender ID
            </label>
            <input
              type="text"
              name="sender_id"
              value={formData.sender_id}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
              placeholder="Enter numeric ID"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Sender Region
            </label>
            <select
              name="sender_region"
              value={formData.sender_region}
              onChange={handleChange}
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
            <label className="block text-sm font-medium text-gray-700">
              Receiver ID
            </label>
            <input
              type="text"
              name="receiver_id"
              value={formData.receiver_id}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
              placeholder="Enter numeric ID"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Receiver Region
            </label>
            <select
              name="receiver_region"
              value={formData.receiver_region}
              onChange={handleChange}
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
            <label className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
              placeholder="Enter amount (numbers only)"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 p-3 border border-gray-300 rounded-lg w-full"
              placeholder="Enter description"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Submit Payment"}
          </button>
        </form>
        {responseMessage && (
          <div className="mt-4 text-center text-sm text-gray-600">
            {responseMessage}
          </div>
        )}
        {/* Home Page Link */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-black font-semibold hover:underline transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentProcessing;
