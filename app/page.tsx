import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Half: Black Section */}
      <div className="w-1/2 bg-black text-white flex flex-col justify-center items-center p-10">
        <h1 className="text-6xl font-extrabold mb-4 text-center">
          Query Quorum
        </h1>
        <p className="text-2xl font-light italic opacity-80 text-center">
          Distributed Payment Processing System
        </p>
      </div>

      {/* Right Half: White Section with Cards */}
      <div className="w-1/2 bg-white text-black p-10 flex items-center justify-center">
        <div className="grid grid-cols-2 gap-10">
          {/* Card 1: Payment Processing */}
          <Link href="/payments">
            <div className="w-56 h-56 bg-gray-200 rounded-xl shadow-lg flex flex-col justify-center items-center cursor-pointer hover:bg-gray-300 transition">
              <h3 className="text-2xl font-bold text-black mb-4 text-center">
                Payment Processing
              </h3>
              <p className="text-base font-light text-gray-700 text-center">
                Simulate seamless transactions between users.
              </p>
            </div>
          </Link>

          {/* Card 2: User Management */}
          <Link href="/users">
            <div className="w-56 h-56 bg-gray-200 rounded-xl shadow-lg flex flex-col justify-center items-center cursor-pointer hover:bg-gray-300 transition">
              <h3 className="text-2xl font-bold text-black mb-4 text-center">
                Users
              </h3>
              <p className="text-base font-light text-gray-700 text-center">
                Access and explore user data effortlessly.
              </p>
            </div>
          </Link>

          {/* Card 3: Data Analysis */}
          <Link href="/analysis">
            <div className="w-56 h-56 bg-gray-200 rounded-xl shadow-lg flex flex-col justify-center items-center cursor-pointer hover:bg-gray-300 transition">
              <h3 className="text-2xl font-bold text-black mb-4 text-center">
                Query Processing
              </h3>
              <p className="text-base font-light text-gray-700 text-center">
                Analyze system performance with precision.
              </p>
            </div>
          </Link>

          {/* Card 4: Infrastructure Insights */}
          <Link href="/infra">
            <div className="w-56 h-56 bg-gray-200 rounded-xl shadow-lg flex flex-col justify-center items-center cursor-pointer hover:bg-gray-300 transition">
              <h3 className="text-2xl font-bold text-black mb-4 text-center">
                Architecture
              </h3>
              <p className="text-base font-light text-gray-700 text-center">
                Discover node regions and distribution.
              </p>
            </div>
          </Link>

          {/* Card 5: Parallel Transactions */}
          <Link href="/parallel">
            <div className="w-56 h-56 bg-gray-200 rounded-xl shadow-lg flex flex-col justify-center items-center cursor-pointer hover:bg-gray-300 transition">
              <h3 className="text-2xl font-bold text-black mb-4 text-center">
                Concurrent Transactions
              </h3>
              <p className="text-base font-light text-gray-700 text-center">
                Test concurrent payment processing.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
