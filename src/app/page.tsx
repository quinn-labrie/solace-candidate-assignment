"use client";

import { useAdvocateFilter, useAdvocates } from "@/hooks/useAdvocates";
import { useState } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: advocates = [], isLoading, isError } = useAdvocates();
  const filteredAdvocates = useAdvocateFilter(advocates, searchTerm);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const onReset = () => {
    setSearchTerm("");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Loading Advocates</h2>
          <p className="text-gray-500">Please wait...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow max-w-md mx-4 text-center">
          <h2 className="text-xl font-semibold mb-2">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">Something went wrong</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Solace Advocates</h1>
          <p className="text-gray-600 mt-1">
            Find the right advocate for your needs
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="flex-1 max-w-md">
              <label className="block text-sm font-medium mb-2">
                Search Advocates
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={onChange}
                placeholder="Search by name, city, degree, or specialty..."
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-end gap-4">
              {searchTerm && (
                <button
                  onClick={onReset}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Clear
                </button>
              )}
              <div className="text-sm text-gray-500">
                {filteredAdvocates.length} of {advocates.length} advocates
              </div>
            </div>
          </div>
        </div>

        {filteredAdvocates.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No advocates found</h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Try adjusting your search"
                : "No advocates available"}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredAdvocates.map((advocate) => (
              <div
                key={advocate.id}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md"
              >
                <h3 className="text-xl font-semibold mb-1">
                  {advocate.firstName} {advocate.lastName}
                </h3>
                <p className="text-gray-500 mb-4">{advocate.city}</p>

                <div className="space-y-2 mb-4">
                  <p className="text-sm">
                    <span className="font-medium">Degree:</span>{" "}
                    {advocate.degree}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Experience:</span>{" "}
                    {advocate.yearsOfExperience} years
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Phone:</span>{" "}
                    <a
                      href={`tel:${advocate.phoneNumber}`}
                      className="text-blue-600 hover:underline"
                    >
                      {advocate.phoneNumber}
                    </a>
                  </p>
                </div>

                {advocate.specialties && advocate.specialties.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {advocate.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  Contact Advocate
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
