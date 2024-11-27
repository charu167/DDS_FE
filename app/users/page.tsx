"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/users");
        // @ts-ignore
        setUsers(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to fetch users.");
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-8">
      <div className="bg-white shadow-2xl rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Users List
        </h1>
        {isLoading ? (
          <p className="text-center text-gray-600">Loading users...</p>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-900 text-white">
                <tr>
                  <th className="p-4 text-left border border-gray-300">ID</th>
                  <th className="p-4 text-left border border-gray-300">
                    Name
                  </th>
                  <th className="p-4 text-left border border-gray-300">
                    Region
                  </th>
                  <th className="p-4 text-left border border-gray-300">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr
                    key={user.id}
                    className="even:bg-gray-100 odd:bg-white hover:bg-gray-200 transition"
                  >
                    <td className="p-4 border border-gray-300">{user.id}</td>
                    <td className="p-4 border border-gray-300">{user.name}</td>
                    <td className="p-4 border border-gray-300">{user.region}</td>
                    <td className="p-4 border border-gray-300">
                      ${parseFloat(user.balance).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

export default UsersPage;
