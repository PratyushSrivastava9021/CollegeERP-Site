import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Clock,
  Edit,
  Save,
  X,
  Camera,
  Award,
  Trophy,
  Star,
  Target,
  TrendingUp,
  Book,
  GraduationCap,
  Users,
  Activity,
  CheckCircle2,
  Settings,
  Shield,
  Bell,
  Globe,
  Eye,
  EyeOff,
  Upload,
  Download,
  Share2,
  Heart,
  MessageCircle,
  Zap,
  Brain,
  Code,
  Database,
  Cpu,
  GitBranch,
  Lightbulb,
  Flame,
  Github,
  Linkedin,
  ExternalLink,
  ChevronRight,
  Plus,
  Minus,
  BarChart3,
  PieChart,
  LineChart,
  Medal,
  Crown,
  Sparkles,
  Rocket,
  Coffee,
  Music,
  Camera as CameraIcon,
  Gamepad2,
  Palette,
  Mountain
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  
  // Default data for display
  const profileData = {
    ...user,
    studentId: user?.role === 'student' ? 'CS2025001' : null,
    facultyId: user?.role === 'teacher' ? 'FAC001' : null,
    semester: user?.role === 'student' ? 6 : null,
    cgpa: user?.role === 'student' ? 8.7 : null,
    coursesCompleted: user?.role === 'student' ? 24 : null,
    totalCourses: user?.role === 'student' ? 32 : null,
    coursesTeaching: user?.role === 'teacher' ? 4 : null,
    totalStudents: user?.role === 'teacher' ? 120 : 150,
    achievements: 12,
    rank: user?.role === 'student' ? 3 : null,
    streak: 45,
    studyHours: user?.role === 'student' ? 156 : null,
    teachingHours: user?.role === 'teacher' ? 18 : null,
    projectsCompleted: user?.role === 'student' ? 8 : user?.role === 'teacher' ? 15 : 8,
    experience: user?.role === 'teacher' ? '5 years' : null,
    researchPapers: user?.role === 'teacher' ? 12 : null,
    rating: user?.role === 'teacher' ? 4.8 : null,
    officeHours: user?.role === 'teacher' ? 'Mon-Fri 2-4 PM' : null,
    qualification: user?.role === 'teacher' ? 'Ph.D. Computer Science' : null
  };

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [animateStats, setAnimateStats] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [showCeoMessage, setShowCeoMessage] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
    phone: '+91 98765 43210',
    address: 'Ghaziabad, Uttar Pradesh, India',
    bio: 'Passionate Computer Science student with expertise in Full-Stack Development, Machine Learning, and System Design. Love building innovative solutions that make a difference.',
    github: 'github.com/harsh-dev',
    linkedin: 'linkedin.com/in/harsh-kumar',
    website: 'harshkumar.dev',
    interests: ['Web Development', 'AI/ML', 'Cloud Computing', 'Mobile Apps'],
    hobbies: ['Photography', 'Gaming', 'Music', 'Travel']
  });

  useEffect(() => {
    setAnimateStats(true);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayChange = (name, value, action = 'add') => {
    setFormData(prev => ({
      ...prev,
      [name]: action === 'add' 
        ? [...prev[name], value]
        : prev[name].filter(item => item !== value)
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsEditing(false);
    showNotification('Profile updated successfully! 🎉', 'success');
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      department: user?.department || '',
      phone: '+91 98765 43210',
      address: 'Ghaziabad, Uttar Pradesh, India',
      bio: 'Passionate Computer Science student with expertise in Full-Stack Development, Machine Learning, and System Design.',
      github: 'github.com/harsh-dev',
      linkedin: 'linkedin.com/in/harsh-kumar',
      website: 'harshkumar.dev',
      interests: ['Web Development', 'AI/ML', 'Cloud Computing', 'Mobile Apps'],
      hobbies: ['Photography', 'Gaming', 'Music', 'Travel']
    });
    setIsEditing(false);
    showNotification('Changes cancelled', 'info');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const skills = [
    { name: 'React.js', level: 90, icon: Code, color: 'blue' },
    { name: 'Node.js', level: 85, icon: Database, color: 'green' },
    { name: 'Python', level: 88, icon: Brain, color: 'purple' },
    { name: 'Java', level: 82, icon: Cpu, color: 'red' },
    { name: 'MongoDB', level: 78, icon: Database, color: 'emerald' },
    { name: 'Git', level: 85, icon: GitBranch, color: 'orange' }
  ];

  const achievements = [
    { title: 'Dean\'s List', description: 'Top 5% academic performance', icon: Trophy, color: 'amber', date: '2024', level: 'Gold' },
    { title: 'Hackathon Winner', description: 'First place in CodeFest 2024', icon: Award, color: 'purple', date: '2024', level: 'Platinum' },
    { title: 'Perfect Attendance', description: '100% class attendance', icon: CheckCircle2, color: 'green', date: '2024', level: 'Silver' },
    { title: 'Research Paper', description: 'Published in IEEE conference', icon: Book, color: 'blue', date: '2023', level: 'Gold' },
    { title: 'Code Champion', description: '50+ coding problems solved', icon: Code, color: 'indigo', date: '2024', level: 'Bronze' },
    { title: 'Team Leader', description: 'Led 3 successful projects', icon: Users, color: 'pink', date: '2024', level: 'Silver' }
  ];

  const recentActivities = [
    { action: 'Completed', item: 'Machine Learning Assignment', time: '2 hours ago', icon: Brain, color: 'purple' },
    { action: 'Enrolled in', item: 'Advanced Algorithms Course', time: '1 day ago', icon: BookOpen, color: 'blue' },
    { action: 'Achieved', item: '95% in Database Systems Exam', time: '3 days ago', icon: Trophy, color: 'amber' },
    { action: 'Submitted', item: 'Final Year Project Proposal', time: '1 week ago', icon: Upload, color: 'green' },
    { action: 'Joined', item: 'Coding Competition Team', time: '2 weeks ago', icon: Users, color: 'indigo' },
    { action: 'Completed', item: 'React.js Certification', time: '1 month ago', icon: Award, color: 'emerald' }
  ];

  const courses = [
    { name: 'Data Structures & Algorithms', grade: 'A+', credits: 4, status: 'completed' },
    { name: 'Machine Learning', grade: 'A', credits: 3, status: 'completed' },
    { name: 'Database Management', grade: 'A+', credits: 4, status: 'completed' },
    { name: 'System Design', grade: '-', credits: 3, status: 'ongoing' },
    { name: 'Computer Networks', grade: '-', credits: 4, status: 'upcoming' },
    { name: 'Software Engineering', grade: 'A', credits: 3, status: 'completed' }
  ];

  const hobbiesIcons = {
    'Photography': CameraIcon,
    'Gaming': Gamepad2,
    'Music': Music,
    'Travel': Mountain,
    'Art': Palette,
    'Reading': Book,
    'Coding': Code,
    'Sports': Target
  };

  return (
    <div className="min-h-screen animate-fade-in relative overflow-hidden">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5"></div>
        <div className="absolute inset-0 grid-bg"></div>
      </div>

      {/* Floating Orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb floating-orb-1"></div>
        <div className="floating-orb floating-orb-2"></div>
        <div className="floating-orb floating-orb-3"></div>
        <div className="floating-orb floating-orb-4"></div>
        <div className="floating-orb floating-orb-5"></div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`notification-toast top-24 right-6 px-6 py-4 rounded-xl shadow-lg border-l-4 animate-slide-up ${
          notification.type === 'success' ? 'bg-green-500/10 border-green-500 text-green-400' :
          notification.type === 'error' ? 'bg-red-500/10 border-red-500 text-red-400' :
          'bg-blue-500/10 border-blue-500 text-blue-400'
        } neon-border`}>
          <div className="flex items-center">
            {notification.type === 'success' && <CheckCircle2 className="w-5 h-5 mr-2" />}
            <p className="font-semibold">{notification.message}</p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        {/* Enhanced Profile Header */}
        <div className="relative mb-8 card-premium neon-border overflow-hidden animate-slide-up">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10">
            <div className="absolute inset-0 bg-black/40"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full translate-y-32 -translate-x-32 animate-pulse delay-1000"></div>
          </div>

          <div className="relative z-10 px-8 py-12">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-end space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Enhanced Avatar */}
                <div className="relative group">
                  <div className="h-24 w-24 sm:h-36 sm:w-36 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-cyan-400/30 shadow-2xl shadow-cyan-500/25 flex items-center justify-center text-2xl sm:text-4xl font-bold text-black group-hover:scale-105 transition-all duration-500 group-hover:rotate-3 animate-pulse-glow">
                    {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
                  </div>
                  
                  {/* Status Indicators */}
                  <div className="absolute -top-2 -right-2 bg-green-500 text-white p-1.5 rounded-full shadow-lg animate-pulse">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div className="absolute -bottom-2 -left-2 bg-yellow-500 text-black p-1.5 rounded-full shadow-lg">
                    <Crown className="h-4 w-4" />
                  </div>
                  
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-cyan-500 hover:bg-cyan-400 text-black p-3 rounded-full shadow-lg transition-all hover:scale-110 hover:rotate-12">
                      <Camera className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {/* Profile Info */}
                <div className="pb-4 text-white text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                    <h1 className="text-2xl sm:text-5xl font-bold gradient-text animate-text-glow">
                      {user?.name}
                    </h1>
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="bg-cyan-500/20 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border border-cyan-400/30 text-cyan-400">
                        Verified ✓
                      </span>
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-500 px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold text-black shadow-lg">
                        Premium
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <p className="text-white/95 text-xl font-medium">
                      {user?.role} • {user?.department}
                    </p>
                    <div className="h-1 w-1 bg-cyan-400 rounded-full"></div>
                    {user?.role === 'student' ? (
                      <p className="text-cyan-400 text-lg">Semester 6</p>
                    ) : (
                      <p className="text-cyan-400 text-lg">Senior Faculty</p>
                    )}
                    <div className="h-1 w-1 bg-cyan-400 rounded-full"></div>
                    <p className="text-gray-300">ID: {user?.role === 'student' ? 'CS2025001' : 'FAC001'}</p>
                  </div>
                  
                  {/* Enhanced Quick Stats */}
                  <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 sm:gap-4">
                    <div className="flex items-center bg-cyan-500/15 backdrop-blur-md px-2 sm:px-4 py-2 sm:py-3 rounded-xl sm:rounded-2xl border border-cyan-400/30 hover:bg-cyan-500/20 transition-all group neon-border">
                      <Trophy className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 text-yellow-400 group-hover:rotate-12 transition-transform" />
                      <div>
                        {user?.role === 'student' ? (
                          <>
                            <span className="text-xs sm:text-sm font-bold">Rank #3</span>
                            <p className="text-xs text-gray-300 hidden sm:block">of 150</p>
                          </>
                        ) : (
                          <>
                            <span className="text-sm font-bold">4 Courses</span>
                            <p className="text-xs text-gray-300">Teaching</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center bg-cyan-500/15 backdrop-blur-md px-4 py-3 rounded-2xl border border-cyan-400/30 hover:bg-cyan-500/20 transition-all group neon-border">
                      <Star className="h-5 w-5 mr-3 text-cyan-400 group-hover:scale-110 transition-transform" />
                      <div>
                        {user?.role === 'student' ? (
                          <>
                            <span className="text-sm font-bold">CGPA 8.7</span>
                            <p className="text-xs text-gray-300">Excellent</p>
                          </>
                        ) : (
                          <>
                            <span className="text-sm font-bold">Rating 4.8</span>
                            <p className="text-xs text-gray-300">Faculty</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center bg-cyan-500/15 backdrop-blur-md px-4 py-3 rounded-2xl border border-cyan-400/30 hover:bg-cyan-500/20 transition-all group neon-border">
                      <Flame className="h-5 w-5 mr-3 text-red-400 group-hover:animate-bounce" />
                      <div>
                        {user?.role === 'student' ? (
                          <>
                            <span className="text-sm font-bold">45 Day Streak</span>
                            <p className="text-xs text-gray-300">Keep it up!</p>
                          </>
                        ) : (
                          <>
                            <span className="text-sm font-bold">5 Years</span>
                            <p className="text-xs text-gray-300">Experience</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center bg-cyan-500/15 backdrop-blur-md px-4 py-3 rounded-2xl border border-cyan-400/30 hover:bg-cyan-500/20 transition-all group neon-border">
                      <Sparkles className="h-5 w-5 mr-3 text-purple-400 group-hover:animate-pulse" />
                      <div>
                        {user?.role === 'student' ? (
                          <>
                            <span className="text-sm font-bold">12 Badges</span>
                            <p className="text-xs text-gray-300">Earned</p>
                          </>
                        ) : (
                          <>
                            <span className="text-sm font-bold">12 Papers</span>
                            <p className="text-xs text-gray-300">Published</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="pb-4 flex items-center gap-3">
                {!isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="group btn-primary"
                    >
                      <Edit className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                      Edit Profile
                    </button>
                    <button className="group btn-outline">
                      <Share2 className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                      Share
                    </button>
                    <button className="group flex items-center px-6 py-4 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-2xl hover:from-pink-600 hover:to-red-600 transition-all shadow-lg hover:shadow-2xl hover:-translate-y-1">
                      <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </>
                ) : (
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className="flex items-center px-8 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-all shadow-lg hover:shadow-2xl disabled:opacity-50 font-semibold"
                    >
                      {isLoading ? (
                        <div className="loading-spinner h-5 w-5 mr-3"></div>
                      ) : (
                        <Save className="h-5 w-5 mr-3" />
                      )}
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      onClick={handleCancel}
                      className="btn-outline"
                    >
                      <X className="h-5 w-5 mr-3" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Tabs */}
        <div className="mb-8 animate-slide-up">
          <div className="card-premium neon-border p-3">
            <div className="flex gap-2 overflow-x-auto">
              {[
                { id: 'overview', label: 'Overview', icon: User, gradient: 'from-cyan-500 to-blue-600' },
                { id: 'academic', label: user?.role === 'student' ? 'Academic' : 'Teaching', icon: GraduationCap, gradient: 'from-purple-500 to-pink-600' },
                { id: 'achievements', label: 'Achievements', icon: Trophy, gradient: 'from-yellow-500 to-orange-600' },
                { id: 'activity', label: 'Activity', icon: Activity, gradient: 'from-green-500 to-emerald-600' },
                { id: 'settings', label: 'Settings', icon: Settings, gradient: 'from-gray-500 to-slate-600' }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-8 py-4 rounded-2xl font-semibold transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.gradient} text-black shadow-lg transform scale-105`
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white hover:scale-102'
                    }`}
                  >
                    <IconComponent className="h-5 w-5 mr-3" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 animate-slide-up">
            {/* Personal Information */}
            <div className="lg:col-span-2 card-premium neon-border">
              <div className="px-4 sm:px-8 py-4 sm:py-6 border-b border-gray-800 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-t-3xl">
                <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                  <User className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-cyan-400" />
                  Personal Information
                </h2>
              </div>
              <div className="p-4 sm:p-8">
                <div className="grid grid-cols-1 gap-6 sm:gap-8">
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-300 mb-4">
                      <User className="h-5 w-5 inline mr-2 text-cyan-400" />
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    ) : (
                      <p className="text-white py-4 font-semibold text-lg group-hover:text-cyan-400 transition-colors">{formData.name}</p>
                    )}
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-300 mb-4">
                      <Mail className="h-5 w-5 inline mr-2 text-green-400" />
                      Email
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    ) : (
                      <p className="text-white py-4 font-semibold text-lg group-hover:text-green-400 transition-colors">{formData.email}</p>
                    )}
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-300 mb-4">
                      <BookOpen className="h-5 w-5 inline mr-2 text-purple-400" />
                      Department
                    </label>
                    {isEditing ? (
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        className="form-select"
                      >
                        <option value="Computer Science">Computer Science</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Mechanical">Mechanical</option>
                        <option value="Civil">Civil</option>
                        <option value="Chemical">Chemical</option>
                      </select>
                    ) : (
                      <p className="text-white py-4 font-semibold text-lg group-hover:text-purple-400 transition-colors">{formData.department}</p>
                    )}
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-300 mb-4">
                      <Phone className="h-5 w-5 inline mr-2 text-orange-400" />
                      Phone
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    ) : (
                      <p className="text-white py-4 font-semibold text-lg group-hover:text-orange-400 transition-colors">{formData.phone}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2 group">
                    <label className="block text-sm font-bold text-gray-300 mb-4">
                      <MapPin className="h-5 w-5 inline mr-2 text-red-400" />
                      Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    ) : (
                      <p className="text-white py-4 font-semibold text-lg group-hover:text-red-400 transition-colors">{formData.address}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2 group">
                    <label className="block text-sm font-bold text-gray-300 mb-4">
                      <MessageCircle className="h-5 w-5 inline mr-2 text-indigo-400" />
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={handleInputChange}
                        className="form-input resize-none"
                      />
                    ) : (
                      <p className="text-white py-4 leading-relaxed text-lg group-hover:text-indigo-400 transition-colors">{formData.bio}</p>
                    )}
                  </div>

                  {/* Social Links */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-300 mb-4">
                      <Globe className="h-5 w-5 inline mr-2 text-cyan-400" />
                      Social Links
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="flex items-center mb-2">
                          <Github className="h-4 w-4 mr-2 text-gray-300" />
                          <span className="text-sm font-medium text-gray-400">GitHub</span>
                        </div>
                        {isEditing ? (
                          <input
                            type="text"
                            name="github"
                            value={formData.github}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        ) : (
                          <a href={`https://${formData.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-cyan-400 transition-colors">
                            <span className="truncate">{formData.github}</span>
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <Linkedin className="h-4 w-4 mr-2 text-blue-400" />
                          <span className="text-sm font-medium text-gray-400">LinkedIn</span>
                        </div>
                        {isEditing ? (
                          <input
                            type="text"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        ) : (
                          <a href={`https://${formData.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-blue-400 transition-colors">
                            <span className="truncate">{formData.linkedin}</span>
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        )}
                      </div>
                      <div>
                        <div className="flex items-center mb-2">
                          <Globe className="h-4 w-4 mr-2 text-green-400" />
                          <span className="text-sm font-medium text-gray-400">Website</span>
                        </div>
                        {isEditing ? (
                          <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        ) : (
                          <a href={`https://${formData.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-300 hover:text-green-400 transition-colors">
                            <span className="truncate">{formData.website}</span>
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Interests */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-300 mb-4">
                      <Lightbulb className="h-5 w-5 inline mr-2 text-yellow-400" />
                      Interests
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {formData.interests.map((interest, index) => (
                        <span key={index} className="group relative px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 rounded-full text-sm font-medium hover:from-cyan-500/30 hover:to-blue-500/30 transition-all border border-cyan-400/30">
                          {interest}
                          {isEditing && (
                            <button
                              onClick={() => handleArrayChange('interests', interest, 'remove')}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </span>
                      ))}
                      {isEditing && (
                        <button className="px-4 py-2 border-2 border-dashed border-cyan-400/30 text-cyan-400 rounded-full text-sm font-medium hover:border-cyan-400 hover:bg-cyan-500/10 transition-all flex items-center">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Interest
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Hobbies */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-gray-300 mb-4">
                      <Coffee className="h-5 w-5 inline mr-2 text-amber-400" />
                      Hobbies
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {formData.hobbies.map((hobby, index) => {
                        const HobbyIcon = hobbiesIcons[hobby] || Coffee;
                        return (
                          <span key={index} className="group relative px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 rounded-full text-sm font-medium hover:from-purple-500/30 hover:to-pink-500/30 transition-all flex items-center border border-purple-400/30">
                            <HobbyIcon className="h-4 w-4 mr-2" />
                            {hobby}
                            {isEditing && (
                              <button
                                onClick={() => handleArrayChange('hobbies', hobby, 'remove')}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            )}
                          </span>
                        );
                      })}
                      {isEditing && (
                        <button className="px-4 py-2 border-2 border-dashed border-purple-400/30 text-purple-400 rounded-full text-sm font-medium hover:border-purple-400 hover:bg-purple-500/10 transition-all flex items-center">
                          <Plus className="h-4 w-4 mr-1" />
                          Add Hobby
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats & Skills Sidebar */}
            <div className="space-y-6">
              {/* Academic Performance */}
              <div className="card-premium neon-border p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <TrendingUp className="h-6 w-6 mr-3 text-green-400" />
                  {user?.role === 'student' ? 'Academic Performance' : 'Teaching Performance'}
                </h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="50" fill="none" stroke="#374151" strokeWidth="8" />
                        <circle 
                          cx="60" 
                          cy="60" 
                          r="50" 
                          fill="none" 
                          stroke="url(#gradient)" 
                          strokeWidth="8"
                          strokeDasharray={`${animateStats ? (user?.role === 'student' ? (8.7 / 10) * 314 : (4.8 / 5) * 314) : 0} 314`}
                          className="transition-all duration-2000 ease-out"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#3b82f6" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <span className="text-3xl font-bold text-white block">{user?.role === 'student' ? '8.7' : '4.8'}</span>
                          <span className="text-xs text-gray-400">{user?.role === 'student' ? 'CGPA' : 'Rating'}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-white">{user?.role === 'student' ? 'Excellent Performance' : 'Outstanding Teaching'}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-400/30">
                      <p className="text-3xl font-bold text-cyan-400">{user?.role === 'student' ? '24' : '4'}</p>
                      <p className="text-sm text-gray-300 font-medium">{user?.role === 'student' ? 'Completed' : 'Teaching'}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-purple-500/20 to-violet-500/20 rounded-2xl border border-purple-400/30">
                      <p className="text-3xl font-bold text-purple-400">{user?.role === 'student' ? '8' : '120'}</p>
                      <p className="text-sm text-gray-300 font-medium">{user?.role === 'student' ? 'Remaining' : 'Students'}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl border border-green-400/30">
                      <p className="text-3xl font-bold text-green-400">{user?.role === 'student' ? '156' : '18'}</p>
                      <p className="text-sm text-gray-300 font-medium">{user?.role === 'student' ? 'Study Hours' : 'Teaching Hours'}</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-2xl border border-yellow-400/30">
                      <p className="text-3xl font-bold text-yellow-400">{user?.role === 'student' ? '8' : '15'}</p>
                      <p className="text-sm text-gray-300 font-medium">{user?.role === 'student' ? 'Projects' : 'Research'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Skills */}
              <div className="card-premium neon-border p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Zap className="h-6 w-6 mr-3 text-yellow-400" />
                  Top Skills
                </h3>
                <div className="space-y-4">
                  {skills.slice(0, 4).map((skill, index) => {
                    const IconComponent = skill.icon;
                    return (
                      <div key={index} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className={`p-2 rounded-xl bg-${skill.color}-500/20 border border-${skill.color}-400/30 mr-3 group-hover:scale-110 transition-transform`}>
                              <IconComponent className={`h-5 w-5 text-${skill.color}-400`} />
                            </div>
                            <span className="font-semibold text-gray-300">{skill.name}</span>
                          </div>
                          <span className="text-sm font-bold text-white">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full bg-gradient-to-r from-${skill.color}-400 to-${skill.color}-600 transition-all duration-1000 ease-out`}
                            style={{ width: animateStats ? `${skill.level}%` : '0%' }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card-premium neon-border p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Rocket className="h-6 w-6 mr-3 text-indigo-400" />
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <button className="w-full group flex items-center px-6 py-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 rounded-2xl transition-all text-cyan-400 font-semibold hover:scale-105 hover:shadow-lg border border-cyan-400/30">
                    <Download className="h-5 w-5 mr-4 group-hover:animate-bounce" />
                    {user?.role === 'student' ? 'Download Transcript' : 'Download CV'}
                    <ChevronRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="w-full group flex items-center px-6 py-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 rounded-2xl transition-all text-green-400 font-semibold hover:scale-105 hover:shadow-lg border border-green-400/30">
                    <Calendar className="h-5 w-5 mr-4 group-hover:animate-pulse" />
                    {user?.role === 'student' ? 'View Schedule' : 'Manage Classes'}
                    <ChevronRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="w-full group flex items-center px-6 py-4 bg-gradient-to-r from-purple-500/20 to-violet-500/20 hover:from-purple-500/30 hover:to-violet-500/30 rounded-2xl transition-all text-purple-400 font-semibold hover:scale-105 hover:shadow-lg border border-purple-400/30">
                    <Bell className="h-5 w-5 mr-4 group-hover:animate-swing" />
                    Notifications
                    <ChevronRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="w-full group flex items-center px-6 py-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 hover:from-yellow-500/30 hover:to-orange-500/30 rounded-2xl transition-all text-yellow-400 font-semibold hover:scale-105 hover:shadow-lg border border-yellow-400/30">
                    <Share2 className="h-5 w-5 mr-4 group-hover:rotate-12 transition-transform" />
                    Share Profile
                    <ChevronRight className="h-4 w-4 ml-auto group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'academic' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up">
            <div className="card-premium neon-border p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <BarChart3 className="h-6 w-6 mr-3 text-cyan-400" />
                {user?.role === 'student' ? 'Course Progress' : 'Teaching Overview'}
              </h3>
              <div className="space-y-8">
                <div className="text-center">
                  <div className="relative w-40 h-40 mx-auto mb-6">
                    <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" fill="none" stroke="#374151" strokeWidth="10" />
                      <circle 
                        cx="60" 
                        cy="60" 
                        r="50" 
                        fill="none" 
                        stroke="url(#courseGradient)" 
                        strokeWidth="10"
                        strokeDasharray={`${animateStats ? (user?.coursesCompleted / user?.totalCourses) * 314 : 0} 314`}
                        className="transition-all duration-2000 ease-out"
                      />
                      <defs>
                        <linearGradient id="courseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="50%" stopColor="#8b5cf6" />
                          <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-4xl font-bold text-white block">
                          {Math.round((user?.coursesCompleted / user?.totalCourses) * 100)}%
                        </span>
                        <span className="text-sm text-gray-400">Complete</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-xl font-semibold text-white mb-2">Course Completion</p>
                  <p className="text-gray-300">{user?.coursesCompleted} of {user?.totalCourses} courses completed</p>
                </div>
                <div className="space-y-3">
                  {courses.map((course, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl hover:bg-gray-700/50 transition-all">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${
                          course.status === 'completed' ? 'bg-green-400' :
                          course.status === 'ongoing' ? 'bg-cyan-400' : 'bg-gray-500'
                        }`}></div>
                        <div>
                          <p className="font-semibold text-white">{course.name}</p>
                          <p className="text-sm text-gray-400">{course.credits} Credits</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">{course.grade || 'Pending'}</p>
                        <p className="text-sm text-gray-400 capitalize">{course.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="card-premium neon-border p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <PieChart className="h-6 w-6 mr-3 text-purple-400" />
                {user?.role === 'student' ? 'Skills Mastery' : 'Teaching Expertise'}
              </h3>
              <div className="space-y-6">
                {skills.map((skill, index) => {
                  const IconComponent = skill.icon;
                  return (
                    <div key={index} className="group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <div className={`p-3 rounded-2xl bg-${skill.color}-500/20 border border-${skill.color}-400/30 mr-4 group-hover:scale-110 transition-transform`}>
                            <IconComponent className={`h-6 w-6 text-${skill.color}-400`} />
                          </div>
                          <div>
                            <span className="font-bold text-gray-300 text-lg">{skill.name}</span>
                            <p className="text-sm text-gray-500">Professional Level</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-white">{skill.level}%</span>
                          <p className="text-sm text-gray-500">Mastery</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-4">
                        <div 
                          className={`h-4 rounded-full bg-gradient-to-r from-${skill.color}-400 to-${skill.color}-600 transition-all duration-1500 ease-out shadow-lg`}
                          style={{ width: animateStats ? `${skill.level}%` : '0%' }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div key={index} className="group card-premium neon-border p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 rounded-2xl bg-${achievement.color}-500/20 border border-${achievement.color}-400/30 group-hover:scale-110 transition-transform`}>
                      <IconComponent className={`h-8 w-8 text-${achievement.color}-400`} />
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        achievement.level === 'Platinum' ? 'bg-gradient-to-r from-gray-400 to-gray-600 text-white' :
                        achievement.level === 'Gold' ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' :
                        achievement.level === 'Silver' ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-white' :
                        'bg-gradient-to-r from-amber-600 to-amber-800 text-white'
                      }`}>
                        {achievement.level}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">{achievement.date}</p>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {achievement.title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {achievement.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-800">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-500">Achievement Unlocked</span>
                      <div className="flex items-center text-yellow-400">
                        <Star className="h-4 w-4 mr-1" />
                        <span className="text-sm font-bold">+50 XP</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up">
            <div className="card-premium neon-border p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Activity className="h-6 w-6 mr-3 text-green-400" />
                Recent Activities
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => {
                  const IconComponent = activity.icon;
                  return (
                    <div key={index} className="group flex items-center p-4 bg-gray-800/50 rounded-2xl hover:bg-gray-700/50 transition-all hover:scale-102">
                      <div className={`p-3 rounded-xl bg-${activity.color}-500/20 border border-${activity.color}-400/30 mr-4 group-hover:scale-110 transition-transform`}>
                        <IconComponent className={`h-5 w-5 text-${activity.color}-400`} />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white">
                          <span className="text-cyan-400">{activity.action}</span> {activity.item}
                        </p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-300 group-hover:translate-x-1 transition-all" />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-3xl p-8 border border-red-400/30">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-xl font-bold text-white flex items-center">
                    <Flame className="h-6 w-6 mr-3 text-red-400" />
                    Study Streak
                  </h4>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-red-400">{user?.streak}</p>
                    <p className="text-sm text-gray-300">Days</p>
                  </div>
                </div>
                <div className="w-full bg-red-800/30 rounded-full h-3">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-1000 ease-out"
                    style={{ width: animateStats ? '85%' : '0%' }}
                  ></div>
                </div>
                <p className="text-sm text-gray-300 mt-3">Keep going! You're doing great!</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-3xl p-8 border border-cyan-400/30">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                  <LineChart className="h-6 w-6 mr-3 text-cyan-400" />
                  This Month
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-black/30 rounded-2xl">
                    <p className="text-2xl font-bold text-cyan-400">156</p>
                    <p className="text-sm text-gray-300">Study Hours</p>
                  </div>
                  <div className="text-center p-4 bg-black/30 rounded-2xl">
                    <p className="text-2xl font-bold text-green-400">23</p>
                    <p className="text-sm text-gray-300">Assignments</p>
                  </div>
                  <div className="text-center p-4 bg-black/30 rounded-2xl">
                    <p className="text-2xl font-bold text-purple-400">8</p>
                    <p className="text-sm text-gray-300">Projects</p>
                  </div>
                  <div className="text-center p-4 bg-black/30 rounded-2xl">
                    <p className="text-2xl font-bold text-yellow-400">95%</p>
                    <p className="text-sm text-gray-300">Attendance</p>
                  </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl p-8 border border-green-400/30">
                <h4 className="text-xl font-bold text-white mb-6 flex items-center">
                  <Target className="h-6 w-6 mr-3 text-green-400" />
                  Goals
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-300">Maintain 8.5+ CGPA</span>
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-300">Complete 3 Projects</span>
                    <CheckCircle2 className="h-5 w-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-300">Publish Research Paper</span>
                    <div className="w-6 h-6 border-2 border-gray-600 rounded-full"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-300">Learn New Framework</span>
                    <div className="w-6 h-6 border-2 border-gray-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up">
            <div className="card-premium neon-border p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Shield className="h-6 w-6 mr-3 text-cyan-400" />
                Privacy & Security
              </h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl">
                  <div className="flex items-center">
                    <Eye className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <p className="font-semibold text-white">Profile Visibility</p>
                      <p className="text-sm text-gray-500">Control who can see your profile</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPrivacy(!showPrivacy)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showPrivacy ? 'bg-cyan-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        showPrivacy ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-2xl">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 mr-3 text-gray-400" />
                    <div>
                      <p className="font-semibold text-white">Email Notifications</p>
                      <p className="text-sm text-gray-500">Receive updates via email</p>
                    </div>
                  </div>
                  <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-cyan-500">
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                  </button>
                </div>
                <div className="pt-4 border-t border-gray-800">
                  <button className="w-full flex items-center justify-center px-6 py-3 bg-red-500/20 text-red-400 rounded-2xl hover:bg-red-500/30 transition-colors font-semibold border border-red-400/30">
                    <Shield className="h-5 w-5 mr-2" />
                    Change Password
                  </button>
                </div>
              </div>
            </div>
            <div className="card-premium neon-border p-8">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <Settings className="h-6 w-6 mr-3 text-purple-400" />
                Account Settings
              </h3>
              <div className="space-y-6">
                <div className="p-4 bg-gray-800/50 rounded-2xl">
                  <div className="flex items-center mb-3">
                    <User className="h-5 w-5 mr-3 text-gray-400" />
                    <p className="font-semibold text-white">Account Information</p>
                  </div>
                  <div className="text-sm text-gray-300 space-y-1">
                    <p><span className="font-medium">Email:</span> {user.email}</p>
                    <p><span className="font-medium">Member Since:</span> {formatDate(user.createdAt)}</p>
                    <p><span className="font-medium">Last Login:</span> {formatDate(user.lastLogin)}</p>
                  </div>
                </div>
                <div className="p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl border border-cyan-400/30">
                  <div className="flex items-center mb-3">
                    <Crown className="h-5 w-5 mr-3 text-yellow-400" />
                    <p className="font-semibold text-white">Premium Features</p>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">Unlock advanced analytics, custom themes, and priority support.</p>
                  <button 
                    onClick={() => setShowPricing(true)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-black py-3 rounded-xl font-semibold hover:from-cyan-400 hover:to-blue-400 transition-all"
                  >
                    Upgrade to Premium
                  </button>
                </div>
                <div className="space-y-3">
                  <button className="w-full flex items-center px-6 py-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-2xl transition-colors text-gray-300 font-medium">
                    <Download className="h-5 w-5 mr-3" />
                    Export Data
                  </button>
                  <button className="w-full flex items-center px-6 py-4 bg-red-500/20 hover:bg-red-500/30 rounded-2xl transition-colors text-red-400 font-medium border border-red-400/30">
                    <X className="h-5 w-5 mr-3" />
                    Deactivate Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Premium Pricing Modal */}
        {showPricing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowPricing(false)} />
            <div className="relative max-w-4xl w-full mx-4 card-premium neon-border animate-slide-up">
              <button
                onClick={() => setShowPricing(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all z-10"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <h2 className="text-4xl font-black gradient-text mb-4">Pricing</h2>
                  <p className="text-xl text-gray-300">Get started for Free. Upgrade to increase limits.</p>
                </div>

                {/* Billing Toggle */}
                <div className="flex justify-center mb-8">
                  <div className="bg-gray-800/50 p-1 rounded-2xl border border-gray-700/50">
                    <button
                      onClick={() => setBillingCycle('monthly')}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                        billingCycle === 'monthly'
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      onClick={() => setBillingCycle('yearly')}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all relative ${
                        billingCycle === 'yearly'
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      Yearly
                      <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                        Save 25%
                      </span>
                    </button>
                  </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Free Plan */}
                  <div className="bg-gray-900/50 border border-gray-700/50 rounded-3xl p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold text-white">$0</span>
                      </div>
                      <p className="text-gray-400 mt-2">per month, no credit card required</p>
                    </div>
                    
                    <button className="w-full bg-gray-700 text-white py-4 rounded-2xl font-semibold mb-6 hover:bg-gray-600 transition-all">
                      Go For Free
                    </button>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-gray-300">
                        <CheckCircle2 className="h-4 w-4 mr-3 text-green-400" />
                        10 Fast requests and 50 Slow requests of Premium models / month
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle2 className="h-4 w-4 mr-3 text-green-400" />
                        1000 Requests of Advanced models / month
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle2 className="h-4 w-4 mr-3 text-green-400" />
                        5000 Autocomplete / month
                      </div>
                    </div>
                  </div>

                  {/* Pro Plan */}
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/30 rounded-3xl p-8 relative">
                    <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold">
                      Recommended
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold text-white">
                          ${billingCycle === 'monthly' ? '3' : '2.25'}
                        </span>
                        {billingCycle === 'yearly' && (
                          <span className="text-2xl text-gray-400 line-through ml-2">$3</span>
                        )}
                      </div>
                      <p className="text-gray-400 mt-2">
                        {billingCycle === 'yearly' && (
                          <span className="text-green-400 font-semibold mr-2">1st Month Discount</span>
                        )}
                        ${billingCycle === 'monthly' ? '10' : '27'} from the second month, billed {billingCycle}
                      </p>
                    </div>
                    
                    <button 
                      onClick={() => setShowCeoMessage(true)}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-2xl font-semibold mb-6 hover:from-green-600 hover:to-emerald-600 transition-all shadow-lg">
                      Get started with Prat Verse
                    </button>
                    
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center text-gray-300">
                        <CheckCircle2 className="h-4 w-4 mr-3 text-green-400" />
                        600 Fast requests and unlimited Slow requests of Premium models / month
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle2 className="h-4 w-4 mr-3 text-green-400" />
                        Unlimited Requests of Advanced models
                      </div>
                      <div className="flex items-center text-gray-300">
                        <CheckCircle2 className="h-4 w-4 mr-3 text-green-400" />
                        Unlimited Autocomplete
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-8 text-center">
                  <p className="text-gray-400 mb-4">Most payment methods supported</p>
                  <div className="flex justify-center items-center space-x-4 opacity-60">
                    <div className="w-8 h-8 bg-gray-600 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-white">♿</span>
                    </div>
                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-white">PP</span>
                    </div>
                    <div className="w-12 h-8 bg-gray-700 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-white">💳</span>
                    </div>
                    <div className="w-12 h-8 bg-blue-700 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-white">VISA</span>
                    </div>
                    <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-white">MC</span>
                    </div>
                    <div className="w-12 h-8 bg-blue-800 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-white">AE</span>
                    </div>
                    <div className="w-12 h-8 bg-orange-600 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-white">DC</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CEO Message Modal */}
        {showCeoMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center animate-fade-in">
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowCeoMessage(false)} />
            <div className="relative max-w-2xl w-full mx-4 card-premium neon-border animate-slide-up">
              <button
                onClick={() => setShowCeoMessage(false)}
                className="absolute top-6 right-6 p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all z-10"
              >
                <X className="h-6 w-6" />
              </button>
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                  <h2 className="text-3xl font-black gradient-text mb-2">Message from the CEO – Prat-Verse</h2>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-400/30 rounded-2xl p-8">
                  <div className="space-y-4 text-gray-300 leading-relaxed">
                    <p className="text-lg">
                      <span className="font-semibold text-white">Dear Users,</span>
                    </p>
                    
                    <p>
                      The Prat-Verse CEO <span className="font-semibold text-cyan-400">Pratyush Srivastava</span> wants to inform you that due to heavy traffic, Premium Services have been temporarily paused. The Prat-Verse CEO <span className="font-semibold text-cyan-400">Pratyush Srivastava</span> and team are working hard to restore them as soon as possible.
                    </p>
                    
                    <p>
                      We sincerely apologize for the inconvenience. The Prat-Verse CEO <span className="font-semibold text-cyan-400">Pratyush Srivastava</span> assures you that services will be back shortly, stronger than before.
                    </p>
                    
                    <div className="pt-4 border-t border-yellow-400/20">
                      <p className="font-semibold text-yellow-400">
                        Warm regards,<br />
                        Prat-Verse CEO
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setShowCeoMessage(false)}
                    className="btn-primary"
                  >
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                    Understood
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;