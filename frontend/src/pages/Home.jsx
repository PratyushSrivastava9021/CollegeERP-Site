import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Calendar,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Star,
  Zap,
  Shield,
  Rocket,
  Globe,
  Award,
  TrendingUp,
  Play
} from 'lucide-react';

const Home = () => {
  const [user, setUser] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Mouse tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Rocket,
      title: 'Lightning Fast',
      description: 'Built with modern technology for blazing fast performance and seamless user experience.',
      color: 'cyan'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee for your peace of mind.',
      color: 'blue'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'Access your academic data from anywhere in the world with our cloud-based platform.',
      color: 'purple'
    },
    {
      icon: Zap,
      title: 'Smart Analytics',
      description: 'AI-powered insights and analytics to help you make data-driven academic decisions.',
      color: 'green'
    }
  ];

  const stats = [
    { number: '50K+', label: 'Active Students', icon: Users },
    { number: '2K+', label: 'Courses Available', icon: BookOpen },
    { number: '500+', label: 'Expert Faculty', icon: Award },
    { number: '99.9%', label: 'Uptime', icon: TrendingUp }
  ];

  const testimonials = [
    {
      name: 'Narendra Modi',
      role: 'Prime Minister of India',
      content: "This platform has revolutionized how I manage my country's academic life. Everything is so intuitive and efficient!",
      avatar: '👩‍💻'
    },
    {
      name: 'Doland Trump',
      role: 'President of USA',
      content: 'As an President of America, I appreciate how this system streamlines course management and student interaction.',
      avatar: '👨‍🏫'
    },
    {
      name: 'Vladimir Putin',
      role: 'President of Russia',
      content: 'The analytics and reporting features have transformed how we make institutional decisions.',
      avatar: '👩‍💼'
    }
  ];

  return (
    <div className="w-full min-h-screen overflow-x-hidden">


      {/* Animated Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(6, 182, 212, 0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-purple-500/15 rounded-full blur-3xl animate-float" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo with Glow Effect */}
          <div className="mb-8 relative">
            <div className="relative inline-block">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center animate-pulse-glow">
                <GraduationCap className="h-12 w-12 text-black" />
              </div>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight">
            <span className="gradient-text">Prat-Verse</span>
            <br />
            <span className="text-white">College ERP</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            Experience the future of academic management with our 
            <span className="text-cyan-400 font-semibold"> AI-powered platform</span> that transforms 
            how institutions operate and students learn.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            {user ? (
              <Link to="/dashboard" className="btn-primary text-lg px-8 py-4 group">
                <span className="flex items-center">
                  <Rocket className="mr-2 h-5 w-5" />
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary text-lg px-8 py-4 group">
                  <span className="flex items-center">
                    <Rocket className="mr-2 h-5 w-5" />
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link to="/login" className="btn-outline text-lg px-8 py-4 group">
                  <span className="flex items-center">
                    <Play className="mr-2 h-5 w-5" />
                    Watch Demo
                  </span>
                </Link>
              </>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex justify-center mb-2">
                    <Icon className="h-6 w-6 text-cyan-400" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Why Choose Our <span className="gradient-text">Platform</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Built with cutting-edge technology to deliver unmatched performance and user experience.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClasses = {
                cyan: 'from-cyan-500 to-cyan-600 shadow-cyan-500/25',
                blue: 'from-blue-500 to-blue-600 shadow-blue-500/25',
                purple: 'from-purple-500 to-purple-600 shadow-purple-500/25',
                green: 'from-green-500 to-green-600 shadow-green-500/25'
              };
              
              return (
                <div 
                  key={index}
                  className="card-black p-8 text-center group hover:shadow-2xl transition-all duration-500 animate-slide-up"
                  style={{animationDelay: `${index * 0.1}s`}}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${colorClasses[feature.color]} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                    {feature.description}
                  </p>
                  
                  {hoveredFeature === index && (
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl -z-10"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Loved by <span className="gradient-text">Thousands</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See what our users have to say about their experience with our platform.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="card-black p-12 text-center">
              <div className="text-6xl mb-6">{testimonials[currentTestimonial].avatar}</div>
              <blockquote className="text-2xl text-gray-300 mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </blockquote>
              <div className="text-white font-bold text-lg">{testimonials[currentTestimonial].name}</div>
              <div className="text-cyan-400 text-sm">{testimonials[currentTestimonial].role}</div>
            </div>
            
            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-cyan-400' : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
            Ready to <span className="gradient-text">Transform</span> Your Institution?
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
            Join thousands of institutions worldwide who trust our platform for their academic management needs.
          </p>
          
          {!user && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/register" className="btn-primary text-lg px-8 py-4 group">
                <span className="flex items-center">
                  <Rocket className="mr-2 h-5 w-5" />
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link to="/login" className="btn-outline text-lg px-8 py-4">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;