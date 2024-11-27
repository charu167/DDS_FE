"use client";

import { useState } from "react";
import axios from "axios";

const AnalysisPage = () => {
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [analysisDetails, setAnalysisDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedRegions((prev) =>
      checked ? [...prev, value] : prev.filter((region) => region !== value)
    );
  };

  const handleAnalyze = async () => {
    if (selectedRegions.length === 0) {
      setError("Please select at least one region.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      // Manually construct the query string
      const query = selectedRegions.map((region) => `regions=${region}`).join("&");
      const response = await axios.get(`http://127.0.0.1:5000/explain_users?${query}`);
    // @ts-ignore
      setAnalysisDetails(response.data.details);
    } catch (err) {
      setError("Failed to fetch analysis data.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-8">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-3xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Analysis Page
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Select the regions you want to analyze and view the key performance
          metrics.
        </p>

        {/* Region Selection */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Select Regions:
          </h2>
          <div className="flex space-x-4">
            {["us", "eu", "asia"].map((region) => (
              <label
                key={region}
                className="flex items-center space-x-2 text-gray-800"
              >
                <input
                  type="checkbox"
                  value={region}
                  onChange={handleRegionChange}
                  className="h-5 w-5"
                />
                <span className="capitalize">{region}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={handleAnalyze}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition mb-6"
          disabled={isLoading}
        >
          {isLoading ? "Analyzing..." : "Analyze"}
        </button>

        {/* Error Message */}
        {error && <p className="text-center text-red-600 mb-4">{error}</p>}

        {/* Analysis Details */}
        {analysisDetails && (
          <div className="bg-gray-100 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Analysis Results:
            </h2>
            <ul className="list-disc list-inside space-y-2">
              {analysisDetails.map((detail: string, index: number) => (
                <li
                  key={index}
                  className={`${
                    detail.includes("execution time") ||
                    detail.includes("regions") ||
                    detail.includes("kv nodes") ||
                    detail.includes("spans")
                      ? "font-semibold text-gray-900"
                      : "text-gray-700"
                  }`}
                >
                  {detail.trim()}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-black font-semibold hover:underline transition"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPage;
