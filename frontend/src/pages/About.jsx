import React, { useState, useEffect } from 'react';
import { Scissors, Users, Clock, Star, Sparkles, Heart } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({
    customers: 0,
    tailors: 0,
    orders: 0
  });

  useEffect(() => {
    setIsVisible(true);
    
    // Animate counters
    const animateCounters = () => {
      const targets = { customers: 5000, tailors: 150, orders: 12000 };
      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;
      
      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        setCounters({
          customers: Math.floor(targets.customers * easeOut),
          tailors: Math.floor(targets.tailors * easeOut),
          orders: Math.floor(targets.orders * easeOut)
        });
        
        if (step >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, stepDuration);
    };
    
    const timeout = setTimeout(animateCounters, 500);
    return () => clearTimeout(timeout);
  }, []);

  const features = [
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "Quality Craftsmanship",
      description: "Master tailors with years of experience create perfect fits with meticulous attention to detail and precision.",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Trusted Community",
      description: "Join thousands of satisfied customers who trust our verified professionals for their tailoring needs.",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Get your perfectly tailored garments delivered right to your doorstep within the promised timeframe.",
      gradient: "from-pink-500 to-orange-500"
    }
  ];

  return (
    <section className="relative py-20 px-4 bg-gradient-to-br from-slate-50 via-white to-blue-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-pink-200 to-orange-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full opacity-30 animate-ping" style={{animationDuration: '4s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6 group hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-purple-600 animate-spin" style={{animationDuration: '3s'}} />
            <span className="text-purple-700 font-medium">Crafting Excellence Since 2020</span>
            <Heart className="w-5 h-5 text-pink-500 animate-pulse" />
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
            About SilaiBazar
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Where traditional craftsmanship meets modern convenience. We're revolutionizing 
            the tailoring industry by connecting you with master artisans who bring your 
            fashion dreams to life with unmatched precision and care.
          </p>

          {/* Stats Counter */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {counters.customers.toLocaleString()}+
              </div>
              <div className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300">Happy Customers</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {counters.tailors}+
              </div>
              <div className="text-gray-600 group-hover:text-purple-600 transition-colors duration-300">Expert Tailors</div>
            </div>
            <div className="group">
              <div className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-orange-500 bg-clip-text text-transparent">
                {counters.orders.toLocaleString()}+
              </div>
              <div className="text-gray-600 group-hover:text-pink-600 transition-colors duration-300">Orders Completed</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`group relative transform transition-all duration-700 hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{transitionDelay: `${index * 200 + 300}ms`}}
            >
              {/* Card */}
              <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/20 overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                
                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-800 group-hover:to-blue-600 transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Decorative elements */}
                <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
                <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-gradient-to-r from-pink-100 to-orange-100 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{transitionDelay: '1s'}}>
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <Star className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
            <span>Experience the SilaiBazar Difference</span>
            <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;