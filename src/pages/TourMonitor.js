import React, { useState } from 'react';

const TourMonitor = () => {
  const [activeTours, setActiveTours] = useState([
    {
      id: 1,
      destination: 'Cox\'s Bazar',
      startDate: '2024-12-20',
      endDate: '2024-12-23',
      status: 'upcoming',
      guide: 'Ahmed Rahman',
      places: ['Cox\'s Bazar Beach', 'Himchori', 'Inani Beach']
    },
    {
      id: 2,
      destination: 'Sylhet',
      startDate: '2024-12-15',
      endDate: '2024-12-18',
      status: 'active',
      guide: null,
      places: ['Srimangal Tea Gardens', 'Ratargul Swamp Forest']
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredTours = filter === 'all' 
    ? activeTours 
    : activeTours.filter(tour => tour.status === filter);

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-gradient-to-r from-primary-400 to-primary-500 text-white',
      upcoming: 'bg-gradient-to-r from-blue-400 to-blue-500 text-white',
      completed: 'bg-gray-100 text-gray-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return styles[status] || styles.completed;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50/20 to-accent-50/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Tour Monitor 📊</h1>
          <p className="text-xl text-gray-600">
            Track and manage your active tours and bookings
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex flex-wrap gap-3">
          {['all', 'active', 'upcoming', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-3 rounded-2xl font-semibold transition-all ${
                filter === status
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                  : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-primary-50 border border-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        {/* Tours List */}
        <div className="space-y-6 mb-12">
          {filteredTours.length === 0 ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-16 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">📋</span>
              </div>
              <p className="text-gray-600 text-lg">No tours found</p>
            </div>
          ) : (
            filteredTours.map(tour => (
              <div key={tour.id} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{tour.destination}</h2>
                    <p className="text-gray-600 flex items-center">
                      <span className="mr-2">📅</span>
                      {new Date(tour.startDate).toLocaleDateString()} - {new Date(tour.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-5 py-2 rounded-2xl text-sm font-bold ${getStatusBadge(tour.status)}`}>
                    {tour.status.charAt(0).toUpperCase() + tour.status.slice(1)}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-2xl border border-primary-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">📍</span> Places to Visit
                    </h3>
                    <ul className="space-y-3">
                      {tour.places.map((place, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <div className="w-6 h-6 bg-primary-500 rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="font-medium">{place}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl border border-purple-100">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                      <span className="mr-2">👨‍🏫</span> Guide Information
                    </h3>
                    {tour.guide ? (
                      <div>
                        <p className="font-bold text-lg text-gray-900 mb-1">{tour.guide}</p>
                        <p className="text-sm text-gray-600 mb-4">Verified Guide ✓</p>
                        <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                          View Profile →
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className="text-gray-700 mb-4">No guide assigned yet</p>
                        <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-xl font-semibold text-sm transition">
                          Book a Guide →
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                  <button className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white py-3 px-6 rounded-2xl font-semibold transition shadow-lg hover:shadow-xl">
                    View Details
                  </button>
                  <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-primary-300 py-3 px-6 rounded-2xl font-semibold transition">
                    Edit Tour
                  </button>
                  {tour.status !== 'completed' && (
                    <button className="bg-red-50 hover:bg-red-100 text-red-700 border-2 border-red-200 py-3 px-6 rounded-2xl font-semibold transition">
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { label: 'Active Tours', count: activeTours.filter(t => t.status === 'active').length, color: 'primary', icon: '✈️' },
            { label: 'Upcoming', count: activeTours.filter(t => t.status === 'upcoming').length, color: 'blue', icon: '📅' },
            { label: 'Completed', count: activeTours.filter(t => t.status === 'completed').length, color: 'green', icon: '✅' },
            { label: 'With Guides', count: activeTours.filter(t => t.guide).length, color: 'purple', icon: '👥' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 border border-gray-100 text-center">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className={`text-4xl font-bold text-${stat.color}-600 mb-2`}>
                {stat.count}
              </div>
              <div className="text-sm font-semibold text-gray-700">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TourMonitor;
