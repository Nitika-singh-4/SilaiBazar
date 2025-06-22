import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Shield, 
  Truck, 
  Award, 
  Search, 
  Calendar, 
  Scissors,
  Star,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const carouselImages = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isVisible, setIsVisible] = useState({});
const navigate = useNavigate()
const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="font-sans overflow-hidden">
      {/* HERO SECTION */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Background Images with Parallax Effect */}
        <div className="absolute inset-0">
          {carouselImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 transform ${
                index === currentImage 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-105'
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
        </button>

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-6">
          <div className="max-w-5xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
              Book Tailors Online with 
              <span className="block text-blue-400 mt-2">SilaiBazar</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed max-w-3xl mx-auto text-gray-100">
              Connect with skilled tailors in your area. Get custom-fitted clothes delivered to your doorstep with just a few clicks.
            </p>
            <button className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-4 rounded-xl text-xl font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
              <span className="flex items-center gap-3">
                <Scissors className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                Book a Tailor
              </span>
            </button>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImage 
                  ? 'bg-blue-500 w-8' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section 
        id="features" 
        data-animate
        className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50 text-center"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-gray-800 transition-all duration-1000 ${
            isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Why Choose <span className="text-blue-600">SilaiBazar?</span>
          </h2>
          <p className={`text-xl text-gray-600 mb-16 transition-all duration-1000 delay-200 ${
            isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Experience the future of tailoring services
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Verified Tailors",
                description: "Professionally vetted tailors to ensure high quality and trust.",
                color: "text-green-500",
                bgColor: "bg-green-50",
                delay: "delay-300"
              },
              {
                icon: Truck,
                title: "Quick Delivery",
                description: "Fast turnaround to meet your deadlines and fashion needs.",
                color: "text-blue-500",
                bgColor: "bg-blue-50",
                delay: "delay-500"
              },
              {
                icon: Award,
                title: "Quality Assured",
                description: "Perfect fits and premium stitching quality guaranteed.",
                color: "text-purple-500",
                bgColor: "bg-purple-50",
                delay: "delay-700"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible.features ? `opacity-100 translate-y-0 ${feature.delay}` : 'opacity-0 translate-y-10'
                }`}
              >
                <div className={`w-20 h-20 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-10 h-10 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section 
        id="howitworks" 
        data-animate
        className="py-20 px-6 bg-white text-center"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-gray-800 transition-all duration-1000 ${
            isVisible.howitworks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            How It <span className="text-blue-600">Works</span>
          </h2>
          <p className={`text-xl text-gray-600 mb-16 transition-all duration-1000 delay-200 ${
            isVisible.howitworks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Simple steps to get your perfect outfit
          </p>

          <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-16">
            {[
              {
                icon: Search,
                title: "1. Search",
                description: "Browse tailor profiles and services in your area.",
                color: "text-blue-500",
                bgColor: "bg-blue-50"
              },
              {
                icon: Calendar,
                title: "2. Book",
                description: "Choose a tailor and book a slot at your convenience.",
                color: "text-green-500",
                bgColor: "bg-green-50"
              },
              {
                icon: Scissors,
                title: "3. Get Stitched",
                description: "Receive your custom-stitched outfit at your doorstep.",
                color: "text-purple-500",
                bgColor: "bg-purple-50"
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className={`group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 max-w-xs ${
                  isVisible.howitworks ? `opacity-100 translate-y-0 delay-${(index + 1) * 300}` : 'opacity-0 translate-y-10'
                }`}>
                  <div className={`w-24 h-24 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className={`w-12 h-12 ${step.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                
                {/* Arrow for desktop */}
                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                    <ChevronRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEEDBACK SECTION */}
      <section 
        id="feedback" 
        data-animate
        className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-100"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold text-center mb-4 text-gray-800 transition-all duration-1000 ${
            isVisible.feedback ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Your <span className="text-blue-600">Feedback</span> Matters
          </h2>
          <p className={`text-xl text-gray-600 text-center mb-12 transition-all duration-1000 delay-200 ${
            isVisible.feedback ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Help us improve your experience
          </p>
          
          <form className={`bg-white p-8 rounded-2xl shadow-xl transition-all duration-1000 delay-300 ${
            isVisible.feedback ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="mb-6">
              <textarea
                className="w-full border-2 border-gray-200 rounded-xl p-4 text-lg focus:border-blue-500 focus:outline-none transition-colors duration-300 resize-none"
                rows="6"
                placeholder="Share your experience or suggestions..."
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="group w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="flex items-center justify-center gap-3">
                <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Submit Feedback
              </span>
            </button>
          </form>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section 
        id="testimonials" 
        data-animate
        className="py-20 px-6 bg-white text-center"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-5xl font-bold mb-4 text-gray-800 transition-all duration-1000 ${
            isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            What Our <span className="text-blue-600">Users Say</span>
          </h2>
          <p className={`text-xl text-gray-600 mb-16 transition-all duration-1000 delay-200 ${
            isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            Real experiences from satisfied customers
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "SilaiBazar saved me so much time. The blouse fit perfectly! The quality exceeded my expectations.",
                author: "Priya S.",
                rating: 5,
                delay: "delay-300"
              },
              {
                text: "Very professional service. Quick delivery and great finish. Highly recommended for everyone!",
                author: "Aman K.",
                rating: 5,
                delay: "delay-500"
              },
              {
                text: "I never knew getting clothes stitched could be this easy! Amazing platform and service.",
                author: "Meera D.",
                rating: 5,
                delay: "delay-700"
              }
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                  isVisible.testimonials ? `opacity-100 translate-y-0 ${testimonial.delay}` : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 italic leading-relaxed">"{testimonial.text}"</p>
                <h4 className="font-bold text-xl text-gray-800">— {testimonial.author}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
         {/* FOOTER SECTION */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                  <Scissors className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  SilaiBazar
                </span>
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">
                Connecting you with skilled tailors for custom-fitted clothes delivered right to your doorstep. Quality craftsmanship made simple.
              </p>
              
              {/* Social Media Links */}
              <div className="flex space-x-4">
                {[
                  { icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z", name: "Twitter" },
                  { icon: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 3.95-.36.1-.74.15-1.13.15-.27 0-.54-.03-.8-.08.54 1.69 2.11 2.95 4 2.98-1.46 1.16-3.31 1.84-5.33 1.84-.35 0-.69-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z", name: "Facebook" },
                  { icon: "M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.093.112.107.211.08.326-.09.378-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378 0 0-.599 2.282-.744 2.840-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24.001 12.017 24.001c6.624 0 11.99-5.367 11.99-11.987C24.007 5.367 18.641.001 12.017.001z", name: "Instagram" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-blue-300">Quick Links</h3>
              <ul className="space-y-3">
                {['About Us', 'How It Works', 'Find Tailors', 'Pricing', 'Blog', 'Careers'].map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-blue-300 transition-colors duration-300 flex items-center group"
                    >
                      <ChevronRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-blue-300">Services</h3>
              <ul className="space-y-3">
                {['Custom Tailoring', 'Alterations', 'Designer Wear', 'Wedding Outfits', 'Corporate Uniforms', 'Express Service'].map((service, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-300 hover:text-blue-300 transition-colors duration-300 flex items-center group"
                    >
                      <Scissors className="w-4 h-4 mr-2 text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact & Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-blue-300">Stay Connected</h3>
              
              {/* Contact Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-300">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <span>+91 98765 43210</span>
                </div>
                
                <div className="flex items-center text-gray-300">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span>hello@silaibazar.com</span>
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <h4 className="font-semibold mb-3 text-white">Newsletter</h4>
                <p className="text-gray-400 text-sm mb-4">Get updates on new tailors and offers</p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-l-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
                  />
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-r-lg transition-all duration-300 transform hover:scale-105">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="text-gray-400 text-sm">
                © 2025 SilaiBazar. All rights reserved. Made with ❤️ for fashion lovers.
              </div>
              
              {/* Links */}
              <div className="flex space-x-6 text-sm">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Support'].map((link, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-blue-300 transition-colors duration-300"
                  >
                    {link}
                  </a>
                ))}
              </div>
              
              {/* Trust Badges */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-400 text-xs">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span>Secure & Trusted</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400 text-xs">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span>Quality Assured</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Home;