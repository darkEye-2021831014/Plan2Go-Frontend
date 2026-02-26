import React, { useState } from 'react';

const TourPlanning = () => {
  const [formData, setFormData] = useState({
    division: '',
    district: '',
    duration: '',
    budget: 'normal',
    locationType: 'nature',
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const divisions = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];
  const districts = {
    'Dhaka': ['Dhaka', 'Gazipur', 'Narayanganj', 'Tangail'],
    'Chittagong': ['Chittagong', "Cox's Bazar", 'Bandarban', 'Rangamati'],
    'Sylhet': ['Sylhet', 'Moulvibazar', 'Habiganj', 'Sunamganj'],
    'Rajshahi': ['Rajshahi', 'Bogura', 'Pabna', 'Naogaon'],
    'Khulna': ['Khulna', 'Jessore', 'Satkhira', 'Bagerhat'],
    'Barisal': ['Barisal', 'Patuakhali', 'Bhola', 'Jhalokathi'],
    'Rangpur': ['Rangpur', 'Dinajpur', 'Nilphamari', 'Lalmonirhat'],
    'Mymensingh': ['Mymensingh', 'Jamalpur', 'Netrokona', 'Sherpur']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateRecommendations = async () => {
    setLoading(true);
    try {
      const requestBody = {
        division: formData.division,
        district: formData.district,
        days: Number(formData.duration),
        budget: formData.budget,
        locationType: formData.locationType,
      };

      const response = await fetch('http://localhost:8080/users/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) throw new Error('Failed to fetch travel plan');

      const data = await response.json();

      // Combine accessories from all locations
      let accessories = [];
      if (data.locations && data.locations.length > 0) {
        data.locations.forEach(loc => {
          if (loc.accessories) accessories = [...new Set([...accessories, ...loc.accessories])];
        });
      }

      setResults({
        places: data.locations,
        accessories: accessories,
        dailyPlan: data.daily_itinerary, // contains weather + activities
      });
    } catch (error) {
      console.error(error);
      setResults({
        places: [],
        accessories: [],
        dailyPlan: {},
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.division && formData.district && formData.duration) {
      generateRecommendations();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/20 to-accent-50/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">AI Tour Planning ✨</h1>
          <p className="text-xl text-gray-600">Tell us your preferences and get personalized travel recommendations</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Trip Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Division *</label>
                <select
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition bg-white"
                >
                  <option value="">Select Division</option>
                  {divisions.map(div => <option key={div} value={div}>{div}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">District *</label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                  disabled={!formData.division}
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition disabled:bg-gray-50 disabled:text-gray-400"
                >
                  <option value="">Select District</option>
                  {formData.division && districts[formData.division]?.map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Trip Duration (Days) *</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  min="1"
                  max="30"
                  required
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                  placeholder="e.g., 3"
                />
              </div>

              {/* Budget */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Budget</label>
                <div className="grid grid-cols-3 gap-3">
                  {['economical', 'normal', 'luxury'].map(budget => (
                    <button
                      key={budget}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, budget }))}
                      className={`px-4 py-3 rounded-2xl border-2 transition font-medium ${formData.budget === budget ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-primary-300 text-gray-700'}`}
                    >
                      {budget.charAt(0).toUpperCase() + budget.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Location Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {['chill', 'nature', 'urban', 'mountains'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, locationType: type }))}
                      className={`px-4 py-3 rounded-2xl border-2 transition font-medium ${formData.locationType === type ? 'border-primary-500 bg-primary-50 text-primary-700' : 'border-gray-200 hover:border-primary-300 text-gray-700'}`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-4 px-6 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
              >
                {loading ? '✨ Generating Recommendations...' : '🚀 Generate AI Recommendations'}
              </button>
            </form>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {results && (
              <>
                {/* Recommended Places */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">📍</span> Recommended Places
                  </h2>
                  <div className="space-y-4">
                    {results.places.map((place, index) => (
                      <div key={index} className="bg-gradient-to-r from-primary-50 to-white p-5 rounded-2xl border-l-4 border-primary-500">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center mb-2">
                              <span className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                                {index + 1}
                              </span>
                              <h3 className="font-bold text-lg text-gray-900">{place.name}</h3>
                            </div>
                            <p className="text-gray-600 ml-11 mb-2">{place.description}</p>
                          </div>
                          <div className="flex items-center text-yellow-500 ml-4">
                            <span className="font-bold text-lg">{place.rating}</span>
                            <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packing Suggestions */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">🎒</span> Packing Suggestions
                  </h2>
                  <div className="grid grid-cols-2 gap-3">
                    {results.accessories.map((item, index) => (
                      <div key={index} className="flex items-center p-4 bg-primary-50 rounded-2xl border border-primary-100">
                        <div className="w-8 h-8 bg-primary-500 rounded-xl flex items-center justify-center mr-3">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Daily Itinerary */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">📅</span> Suggested Itinerary
                  </h2>
                  <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-2xl border border-primary-100 space-y-4">
                    {Object.entries(results.dailyPlan).map(([day, info], idx) => (
                      <div key={idx}>
                        <h3 className="font-semibold text-primary-700 mb-1">
                          {day} ({info.weather} Day)
                        </h3>
                        <ul className="list-disc list-inside text-gray-700">
                          {info.activities.map((act, i) => <li key={i}>{act}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {!results && !loading && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-16 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl">✈️</span>
                </div>
                <p className="text-gray-600 text-lg">Fill in the form to get AI-powered recommendations</p>
              </div>
            )}

            {loading && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-16 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary-200 border-t-primary-600 mx-auto mb-6"></div>
                <p className="text-gray-600 text-lg font-medium">✨ AI is analyzing your preferences...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourPlanning;
