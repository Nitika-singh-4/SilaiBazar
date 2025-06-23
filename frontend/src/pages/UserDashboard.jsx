
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MapPin, Phone, Mail, Star, X, Scissors, Clock, DollarSign, Calendar, CheckCircle } from "lucide-react";

const UserDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [nearbyTailors, setNearbyTailors] = useState([]);
  const [loadingNearby, setLoadingNearby] = useState(false);
  const [selectedTailor, setSelectedTailor] = useState(null);
  const [showServicesModal, setShowServicesModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    tailor: null,
    service: '',
    price: 0,
    date: '',
    time: '',
    notes: ''
  });
  const [bookingLoading, setBookingLoading] = useState(false);

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

  const openBookingModal = (tailor, service, price) => {
    setBookingDetails({
      tailor: tailor,
      service: service,
      price: price,
      date: '',
      time: '',
      notes: ''
    });
    setShowBookingModal(true);
    setShowServicesModal(false);
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    setBookingDetails({
      tailor: null,
      service: '',
      price: 0,
      date: '',
      time: '',
      notes: ''
    });
  };

  const handleBookingInputChange = (field, value) => {
    setBookingDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleConfirmBooking = async () => {
    if (!bookingDetails.date || !bookingDetails.time) {
      alert("Please select both date and time for your booking.");
      return;
    }

    setBookingLoading(true);
    
    try {
      const response = await axios.post(
        "http://localhost:5000/api/bookings",
        {
          tailorId: bookingDetails.tailor._id,
          service: bookingDetails.service,
          date: bookingDetails.date,
          time: bookingDetails.time,
          notes: bookingDetails.notes
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking confirmed successfully!");
      console.log("Booking created:", response.data);
      closeBookingModal();
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 18) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
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
                fetchNearbyTailors(latitude, longitude, 5);
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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div 
              className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-500 ease-out scale-100 border border-white/20"
              style={{
                animation: 'modalSlideIn 0.3s ease-out forwards',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1 text-white drop-shadow-sm">
                        {selectedTailor.shopName || selectedTailor.name}
                      </h3>
                      <div className="flex items-center gap-2 text-white/90">
                        <Scissors className="w-4 h-4" />
                        <span className="text-sm font-medium">Professional Tailoring Services</span>
                      </div>
                    </div>
                    <button
                      onClick={closeModal}
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="max-h-96 overflow-y-auto">
                <div className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-900">Services & Pricing</h4>
                        <p className="text-sm text-gray-500">Transparent pricing for quality work</p>
                      </div>
                    </div>
                    
                    {selectedTailor.pricing && Object.keys(selectedTailor.pricing).length > 0 ? (
                      <div className="space-y-3">
                        {Object.entries(selectedTailor.pricing).map(([service, price], index) => (
                          <div
                            key={service}
                            className="group relative overflow-hidden bg-gradient-to-r from-gray-50 to-blue-50/50 hover:from-blue-50 hover:to-purple-50 rounded-2xl p-4 transition-all duration-300 hover:shadow-md border border-gray-100/50 hover:border-blue-200/50"
                            style={{
                              animationDelay: `${index * 0.1}s`,
                              animation: 'fadeInUp 0.4s ease-out forwards'
                            }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%]"></div>
                            
                            <div className="relative flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-sm"></div>
                                <span className="font-semibold text-gray-800 capitalize">
                                  {service.replace(/([A-Z])/g, ' $1')}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full text-sm border border-emerald-100 shadow-sm">
                                  ₹{price}
                                </span>
                                <button
                                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                                  onClick={() => openBookingModal(selectedTailor, service, price)}
                                >
                                  Book Now
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl border border-gray-100">
                        <div className="relative">
                          <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <Clock className="w-10 h-10 text-gray-400" />
                          </div>
                          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-blue-100 rounded-full opacity-20 animate-ping"></div>
                        </div>
                        <h5 className="font-semibold text-gray-700 mb-2">Pricing Coming Soon</h5>
                        <p className="text-gray-500 text-sm mb-1">
                          We're updating our service rates.
                        </p>
                        <p className="text-gray-400 text-xs">
                          Contact directly for current pricing information.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Contact Section */}
                  <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <Phone className="w-4 h-4 text-white" />
                      </div>
                      <h5 className="font-bold text-gray-900">Get in Touch</h5>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:border-green-200 transition-colors duration-200">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-green-600 font-medium uppercase tracking-wide">Phone</p>
                          <p className="font-semibold text-gray-800">{selectedTailor.phoneNumber}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:border-blue-200 transition-colors duration-200">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
                          <Mail className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-blue-600 font-medium uppercase tracking-wide">Email</p>
                          <p className="font-semibold text-gray-800 truncate">{selectedTailor.user.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Booking Modal */}
        {showBookingModal && bookingDetails.tailor && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all duration-500 ease-out scale-100">
              {/* Booking Modal Header */}
              <div className="bg-gradient-to-br from-green-600 via-emerald-600 to-teal-500 p-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-1 text-white drop-shadow-sm">
                        Book Appointment
                      </h3>
                      <div className="flex items-center gap-2 text-white/90">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm font-medium">Schedule Your Service</span>
                      </div>
                    </div>
                    <button
                      onClick={closeBookingModal}
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Booking Modal Content */}
              <div className="p-6 max-h-96 overflow-y-auto">
                {/* Booking Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6 border border-blue-100">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Booking Summary
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tailor:</span>
                      <span className="font-semibold text-gray-900">{bookingDetails.tailor.shopName || bookingDetails.tailor.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-semibold text-gray-900 capitalize">{bookingDetails.service.replace(/([A-Z])/g, ' $1')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price:</span>
                      <span className="font-bold text-green-600">₹{bookingDetails.price}</span>
                    </div>
                  </div>
                </div>

                {/* Date Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Date *
                  </label>
                  <input
                    type="date"
                    value={bookingDetails.date}
                    onChange={(e) => handleBookingInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>

                {/* Time Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Select Time *
                  </label>
                  <select
                    value={bookingDetails.time}
                    onChange={(e) => handleBookingInputChange('time', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Choose a time slot</option>
                    {generateTimeSlots().map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                {/* Additional Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={bookingDetails.notes}
                    onChange={(e) => handleBookingInputChange('notes', e.target.value)}
                    placeholder="Any specific requirements or measurements..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    rows="3"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={closeBookingModal}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-semibold transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    disabled={!bookingDetails.date || !bookingDetails.time || bookingLoading}
                    className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {bookingLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Confirming...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Confirm Booking
                      </>
                    )}
                  </button>
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