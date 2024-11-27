"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const InfraInsightsPage = () => {
  const [nodes, setNodes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/node_regions");
        // @ts-ignore
        setNodes(response.data.nodes);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch node data.");
        setIsLoading(false);
      }
    };

    fetchNodes();
  }, []);

  // Group nodes by region
  const groupNodesByRegion = () => {
    return nodes.reduce((acc, node) => {
      // @ts-ignore
      if (!acc[node.region]) acc[node.region] = [];
      // @ts-ignore
      acc[node.region].push(node);
      return acc;
    }, {});
  };

  const regions = groupNodesByRegion();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-8">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-6xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Infrastructure Insights
        </h1>
        {isLoading ? (
          <p className="text-center text-gray-600">Loading nodes...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="space-y-8">
            {Object.entries(regions).map(([region, nodes]) => (
              <div key={region}>
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 capitalize">
                  Region: {region.toUpperCase()}
                </h2>
                <div className="grid grid-cols-3 gap-6">
                  {/* @ts-ignore */}
                  {nodes.map((node: any) => (
                    <div
                      key={node.node_id}
                      className="bg-gray-100 rounded-lg shadow-md p-4 flex flex-col justify-center items-center hover:bg-gray-200 transition"
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {node.name.toUpperCase()}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Node ID:{" "}
                        <span className="font-semibold">{node.node_id}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Region: <span className="font-semibold">{region}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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

export default InfraInsightsPage;
