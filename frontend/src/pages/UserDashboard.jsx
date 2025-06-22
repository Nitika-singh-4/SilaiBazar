import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin, Phone, Mail, Star, X, Scissors, Clock, DollarSign } from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [nearbyTailors, setNearbyTailors] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const [selectedTailor, setSelectedTailor] = useState(null);
  const [showServicesModal, setShowServicesModal] = useState(false);

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchNearbyTailors = async (lat, lng, radius) => {
    try {
      setLoadingNearby(true);
      const res = await axios.get(
        `http://localhost:5000/api/tailors/nearby?lat=${lat}&lng=${lng}&radius=${radius}`
      );
      // Add `showPricing` flag to each tailor
      const updatedTailors = res.data.map((tailor) => ({
        ...tailor,
        showPricing: false,
      }));
      setNearbyTailors(updatedTailors);
      console.log(res.data);
    } catch (err) {
      console.error("Failed to fetch nearby tailors", err);
    } finally {
      setLoadingNearby(false);
    }
  };

  const togglePricing = (id) => {
    setNearbyTailors((prev) =>
      prev.map((tailor) =>
        tailor._id === id
          ? { ...tailor, showPricing: !tailor.showPricing }
          : tailor
      )
    );
  };

  const handleExploreServices = (tailor) => {
    setSelectedTailor(tailor);
    setShowServicesModal(true);
  };

  const closeModal = () => {
    setShowServicesModal(false);
    setSelectedTailor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Find the best tailors near you and explore their services with just a click
          </p>
        </div>

        {/* Find Nearby Tailors Button */}
        <div className="text-center mb-8 sm:mb-12">
          <button
            onClick={() => {
              navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords;
                fetchNearbyTailors(latitude, longitude, 5); // 5 km radius
              });
            }}
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-out"
          >
            <MapPin className="w-5 h-5 group-hover:animate-pulse" />
            Find Tailors Near Me
            <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Nearby Tailors Section */}
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
            Tailors Near You
          </h2>
          
          {loadingNearby ? (
            <div className="flex justify-center items-center py-12">
              <div className="relative">
                <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 sm:w-16 sm:h-16 border-4 border-transparent border-b-purple-600 rounded-full animate-spin animation-delay-150"></div>
              </div>
            </div>
          ) : nearbyTailors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {nearbyTailors.map((tailor, index) => (
                <div
                  key={tailor._id}
                  className="group bg-white rounded-2xl p-4 sm:p-6 shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-gray-100 hover:border-blue-200"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg sm:text-xl text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {tailor.shopName || tailor.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">4.8</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Scissors className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>

                  <div className="space-y-2 sm:space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="truncate">{tailor.user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{tailor.phoneNumber}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{tailor.address}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleExploreServices(tailor)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2.5 sm:py-3 px-4 rounded-xl font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 ease-out"
                  >
                    Explore Services
                  </button>

                  {tailor.showPricing && (
                    <div className="mt-4 animate-fadeIn">
                      <h4 className="font-semibold mb-2 text-gray-800">Pricing</h4>
                      {tailor.pricing && Object.keys(tailor.pricing).length > 0 ? (
                        <ul className="space-y-2 text-sm">
                          {Object.entries(tailor.pricing).map(([service, price]) => (
                            <li key={service} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                              <span className="capitalize">{service}</span>
                              <span className="font-semibold text-green-600">₹{price}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500">
                          No pricing info available.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 sm:py-16">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 text-sm sm:text-base">No tailors found nearby.</p>
              <p className="text-gray-400 text-xs sm:text-sm mt-2">Try adjusting your location or search radius</p>
            </div>
          )}
        </div>

        {/* Services Modal */}
        {showServicesModal && selectedTailor && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div 
              className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-300 ease-out scale-100"
              style={{
                animation: 'modalSlideIn 0.3s ease-out forwards'
              }}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl sm:text-2xl font-bold">
                      {selectedTailor.shopName || selectedTailor.name}
                    </h3>
                    <button
                      onClick={closeModal}
                      className="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-all duration-200"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Scissors className="w-5 h-5" />
                    <span className="text-sm opacity-90">Professional Tailoring Services</span>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 max-h-96 overflow-y-auto">
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-500" />
                    Our Services & Pricing
                  </h4>
                  
                  {selectedTailor.pricing && Object.keys(selectedTailor.pricing).length > 0 ? (
                    <div className="space-y-3">
                      {Object.entries(selectedTailor.pricing).map(([service, price], index) => (
                        <div
                          key={service}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-200"
                          style={{
                            animationDelay: `${index * 0.1}s`,
                            animation: 'fadeInUp 0.4s ease-out forwards'
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <span className="font-medium text-gray-700 capitalize">
                              {service.replace(/([A-Z])/g, ' $1')}
                            </span>
                          </div>
                          <span className="font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm">
                            ₹{price}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-gray-500 text-sm">
                        Pricing information will be available soon.
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Contact the tailor directly for current rates.
                      </p>
                    </div>
                  )}
                </div>

                {/* Contact Section */}
                <div className="border-t pt-4">
                  <h5 className="font-semibold text-gray-800 mb-3">Get in Touch</h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4 text-green-500" />
                      <span>{selectedTailor.phoneNumber}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4 text-blue-500" />
                      <span className="truncate">{selectedTailor.user.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .animation-delay-150 {
          animation-delay: 0.15s;
        }
      `}</style>
    </div>
  );
};

export default UserDashboard;