import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const TourGuides = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [numDays, setNumDays] = useState(1);

  const divisions = [
    "Dhaka",
    "Chittagong",
    "Khulna",
    "Barishal",
    "Sylhet",
    "Rajshahi",
    "Rangpur",
    "Mymensingh",
  ];

  // Fetch all guides on page load
  useEffect(() => {
    const fetchAllGuides = async () => {
      setLoading(true);
      setServerError("");
      try {
        const response = await fetch("http://localhost:8080/users/guide", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city: "" }), // empty means fetch all
        });

        if (!response.ok) throw new Error("Failed to fetch guides");

        const data = await response.json();
        setGuides(data || []);
      } catch (error) {
        console.error(error);
        setServerError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAllGuides();
  }, []);

  // Filter guides
  const filteredGuides = guides.filter((guide) => {
    const fullName = `${guide.first_name} ${guide.last_name}`.toLowerCase();
    const matchesSearch = fullName.includes(searchQuery.toLowerCase());
    const matchesCity = selectedLocation
      ? guide.city.toLowerCase() === selectedLocation.toLowerCase()
      : true;
    return matchesSearch && matchesCity;
  });

  const handleBookGuide = (guide) => {
    setSelectedGuide(guide);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    alert(
      `Booking confirmed with ${selectedGuide.first_name} ${selectedGuide.last_name}!`
    );
    setShowBookingModal(false);
    setSelectedGuide(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/20 to-accent-50/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Find Tour Guides 👥
          </h1>
          <p className="text-xl text-gray-600">
            Book verified local guides for your next adventure
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Search Guides
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
                className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Filter by Division
              </label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white"
              >
                <option value="">All Divisions</option>
                {divisions.map((div) => (
                  <option key={div} value={div}>
                    {div}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading && (
          <p className="text-center text-gray-600 mb-6">Loading guides...</p>
        )}
        {serverError && (
          <p className="text-center text-red-500 mb-6">{serverError}</p>
        )}

        {/* Guides Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <div
              key={guide.id}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-5">
                  <div className="flex items-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center text-3xl mr-4">
                      👤
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {guide.first_name} {guide.last_name}
                      </h3>
                      <p className="text-gray-600 text-sm flex items-center mt-1">
                        <span className="mr-1">📍</span>
                        {guide.city}
                      </p>
                      {guide.languages && (
                        <p className="text-gray-600 text-sm flex items-center mt-1">
                          <span className="mr-1">🗣️</span>
                          {Array.isArray(guide.languages)
                            ? guide.languages.join(", ")
                            : String(guide.languages)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-5 border-t border-gray-200">
                  <div>
                    <span className="text-3xl font-bold text-primary-600">
                      ৳{guide.hourly_fee}
                    </span>
                    <span className="text-gray-600 text-sm ml-1">/hour</span>
                  </div>
                  <button
                    onClick={() => handleBookGuide(guide)}
                    className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-3 rounded-2xl font-semibold transition shadow-lg hover:shadow-xl"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredGuides.length === 0 && !loading && (
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-16 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">👥</span>
            </div>
            <p className="text-gray-600 text-lg">
              No guides found matching your criteria
            </p>
          </div>
        )}

        {/* Booking Modal */}
        {showBookingModal && selectedGuide && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Book {selectedGuide.first_name} {selectedGuide.last_name}
              </h2>
              <div className="space-y-5 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of hours
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={numDays}
                    onChange={(e) => setNumDays(Number(e.target.value))}
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  />
                </div>
                <div className="bg-primary-50 p-5 rounded-2xl">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Amount
                  </label>
                  <div className="text-3xl font-bold text-primary-600">
                    ৳{selectedGuide.hourly_fee * numDays}
                  </div>
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-2xl font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmBooking}
                  className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-3.5 rounded-2xl font-semibold transition shadow-lg hover:shadow-xl"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourGuides;
