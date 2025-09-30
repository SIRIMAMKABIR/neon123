import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, TrendingUp, Users, Target, Calendar, Eye, ChartBar as BarChart3, Zap, Crown, ArrowRight, Play } from "lucide-react";
import NavBar from "@/components/NavBar";
import AuraBackground from "@/components/AuraBackground";
import usersData from "@/mock/users.json";
import postsData from "@/mock/posts.json";

const Dashboard = () => {
  const [showImpactCrate, setShowImpactCrate] = useState(false);
  const [impactRevealed, setImpactRevealed] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const currentUser = usersData[0]; // Mock current user
  const userPosts = postsData.filter(post => post.userId === currentUser.id);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const conciergeInsights = [
    {
      type: "highlight",
      title: "Your 'Art Gallery' fingerprint saw a 22% lift from London",
      action: "Review Analytics",
      priority: "high"
    },
    {
      type: "suggestion", 
      title: "Consider adding a testimonials section to boost trust",
      action: "Add Section",
      priority: "medium"
    },
    {
      type: "opportunity",
      title: "3 new followers from the design community",
      action: "Engage",
      priority: "low"
    }
  ];

  const journeyMilestones = [
    { title: "Account Created", date: "Jan 15, 2024", completed: true },
    { title: "First Fingerprint", date: "Jan 16, 2024", completed: true },
    { title: "1K Visitors", date: "Feb 3, 2024", completed: true },
    { title: "First Client Inquiry", date: "Feb 15, 2024", completed: true },
    { title: "10K Reach", date: "Coming Soon", completed: false }
  ];

  const handleImpactCrateClick = () => {
    setShowImpactCrate(true);
    setTimeout(() => {
      setImpactRevealed(true);
    }, 1000);
  };

  return (
    <AuraBackground variant="blue" intensity="subtle">
      <NavBar />
      
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-6 py-12 max-w-7xl">
          
          {/* Digital Concierge Bar */}
          <motion.div
            className="glass-strong rounded-3xl p-8 mb-12 border border-primary/20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-6 lg:space-y-0">
              <div className="flex-1">
                <motion.h2 
                  className="text-2xl font-serif font-bold text-foreground mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  Good {currentTime.getHours() < 12 ? "morning" : currentTime.getHours() < 18 ? "afternoon" : "evening"}, {currentUser.name.split(' ')[0]}.
                </motion.h2>
                <motion.p 
                  className="text-foreground/60 mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                >
                  It's {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} in {currentUser.location}. 
                  Your digital fingerprint is performing beautifully.
                </motion.p>
                
                <div className="space-y-2">
                  {conciergeInsights.map((insight, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-3 glass rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-2 h-2 rounded-full ${
                          insight.priority === "high" ? "bg-crimson" :
                          insight.priority === "medium" ? "bg-primary" : "bg-violet"
                        }`} />
                        <span className="text-foreground/80 group-hover:text-foreground transition-colors">
                          {insight.title}
                        </span>
                      </div>
                      <button className="text-primary hover:text-primary/80 text-sm font-medium transition-colors">
                        {insight.action}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.div
                className="flex space-x-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <Button className="btn-glass">
                  <Eye className="w-4 h-4 mr-2" />
                  Review Analytics
                </Button>
                <Button className="btn-neon">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Optimize
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Atelier Analytics */}
              <motion.div
                className="glass-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-serif font-bold text-foreground">
                    Atelier Analytics
                  </h3>
                  <Button variant="outline" className="glass border-white/20">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Full Report
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <motion.div 
                      className="text-4xl font-bold text-primary mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      {currentUser.followers.toLocaleString()}
                    </motion.div>
                    <div className="text-foreground/60">Total Reach</div>
                    <div className="text-sm text-green-400 mt-1">+22% this week</div>
                  </div>
                  <div className="text-center">
                    <motion.div 
                      className="text-4xl font-bold text-violet mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                    >
                      8.9%
                    </motion.div>
                    <div className="text-foreground/60">Engagement Rate</div>
                    <div className="text-sm text-green-400 mt-1">+1.2% this week</div>
                  </div>
                  <div className="text-center">
                    <motion.div 
                      className="text-4xl font-bold text-crimson mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7, type: "spring" }}
                    >
                      {userPosts.length}
                    </motion.div>
                    <div className="text-foreground/60">Posts Published</div>
                    <div className="text-sm text-primary mt-1">2 this week</div>
                  </div>
                </div>

                {/* Mock Chart */}
                <div className="h-64 glass rounded-2xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-violet/5 to-crimson/5" />
                  <motion.div
                    className="text-foreground/40 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                  >
                    <BarChart3 className="w-12 h-12 mx-auto mb-4" />
                    <p className="font-medium">Interactive Analytics Chart</p>
                    <p className="text-sm">Follower growth, engagement trends, and reach metrics</p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Your Journey Timeline */}
              <motion.div
                className="glass-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-2xl font-serif font-bold text-foreground mb-8">
                  Your Journey
                </h3>
                
                <div className="space-y-6">
                  {journeyMilestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-4 group cursor-pointer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                      whileHover={{ x: 8 }}
                    >
                      <motion.div
                        className={`w-4 h-4 rounded-full border-2 ${
                          milestone.completed 
                            ? "bg-primary border-primary" 
                            : "border-white/30"
                        }`}
                        whileHover={{ scale: 1.2 }}
                      >
                        {milestone.completed && (
                          <motion.div
                            className="w-2 h-2 bg-white rounded-full m-0.5"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                          />
                        )}
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className={`font-medium ${
                          milestone.completed ? "text-foreground" : "text-foreground/50"
                        }`}>
                          {milestone.title}
                        </div>
                        <div className="text-sm text-foreground/50">{milestone.date}</div>
                      </div>
                      
                      {milestone.completed && (
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.1 }}
                        >
                          <ArrowRight className="w-4 h-4 text-primary" />
                        </motion.div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Moment of Impact Crate */}
              <motion.div
                className="glass-card text-center"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-xl font-serif font-bold text-foreground mb-6">
                  Moment of Impact
                </h3>
                
                <motion.div
                  className="relative mx-auto mb-6 cursor-pointer group"
                  onClick={handleImpactCrateClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-violet/20 flex items-center justify-center mx-auto"
                    animate={{ 
                      boxShadow: [
                        "0 0 20px rgba(140, 197, 255, 0.2)",
                        "0 0 40px rgba(140, 197, 255, 0.4)",
                        "0 0 20px rgba(140, 197, 255, 0.2)"
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute inset-0 rounded-2xl border-2 border-primary/30"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
                
                <p className="text-foreground/60 text-sm">
                  Click to reveal today's highlight
                </p>

                {/* Impact Reveal Modal */}
                <AnimatePresence>
                  {showImpactCrate && (
                    <motion.div
                      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => {
                        setShowImpactCrate(false);
                        setImpactRevealed(false);
                      }}
                    >
                      <motion.div
                        className="glass-strong max-w-lg w-full rounded-3xl p-8 text-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <motion.div
                          className="w-16 h-16 bg-gradient-to-br from-primary to-violet rounded-2xl mx-auto mb-6 flex items-center justify-center"
                          animate={{ rotate: impactRevealed ? 0 : 360 }}
                          transition={{ duration: 1 }}
                        >
                          <Crown className="w-8 h-8 text-white" />
                        </motion.div>
                        
                        <AnimatePresence mode="wait">
                          {!impactRevealed ? (
                            <motion.div
                              key="loading"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            >
                              <p className="text-foreground/60">Revealing your moment...</p>
                            </motion.div>
                          ) : (
                            <motion.div
                              key="revealed"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.6 }}
                            >
                              <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                                Featured in Design Letter
                              </h3>
                              <p className="text-foreground/80 leading-relaxed mb-6">
                                Your latest project was featured in this week's Design Letter newsletter, 
                                reaching 50,000+ design professionals worldwide.
                              </p>
                              <Button className="btn-neon">
                                <Eye className="w-4 h-4 mr-2" />
                                View Feature
                              </Button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Quick Stats */}
              <motion.div
                className="glass-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h3 className="text-xl font-serif font-bold text-foreground mb-6">
                  Performance Snapshot
                </h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/60">Profile Views</span>
                    <motion.span 
                      className="font-bold text-primary"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      2.4K
                    </motion.span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/60">Post Reach</span>
                    <motion.span 
                      className="font-bold text-violet"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      15.7K
                    </motion.span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/60">Engagement Rate</span>
                    <motion.span 
                      className="font-bold text-crimson"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1 }}
                    >
                      8.9%
                    </motion.span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-foreground/60">Growth Score</span>
                    <motion.span 
                      className="font-bold text-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.1 }}
                    >
                      {currentUser.score.toLocaleString()}
                    </motion.span>
                  </div>
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                className="glass-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h3 className="text-xl font-serif font-bold text-foreground mb-6">
                  Quick Actions
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link to="/templates">
                    <motion.button
                      className="glass p-6 rounded-2xl hover:bg-white/10 transition-colors text-left group w-full"
                      whileHover={{ y: -2 }}
                    >
                      <Sparkles className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                      <h4 className="font-semibold text-foreground mb-2">Templates</h4>
                      <p className="text-sm text-foreground/60">Browse curated designs</p>
                    </motion.button>
                  </Link>

                  <Link to="/builder">
                    <motion.button
                      className="glass p-6 rounded-2xl hover:bg-white/10 transition-colors text-left group w-full"
                      whileHover={{ y: -2 }}
                    >
                      <TrendingUp className="w-6 h-6 text-violet mb-3 group-hover:scale-110 transition-transform" />
                      <h4 className="font-semibold text-foreground mb-2">Builder</h4>
                      <p className="text-sm text-foreground/60">Create your fingerprint</p>
                    </motion.button>
                  </Link>

                  <Link to="/referrals">
                    <motion.button
                      className="glass p-6 rounded-2xl hover:bg-white/10 transition-colors text-left group w-full"
                      whileHover={{ y: -2 }}
                    >
                      <Users className="w-6 h-6 text-crimson mb-3 group-hover:scale-110 transition-transform" />
                      <h4 className="font-semibold text-foreground mb-2">Referrals</h4>
                      <p className="text-sm text-foreground/60">Earn rewards</p>
                    </motion.button>
                  </Link>

                  <Link to="/leaderboard">
                    <motion.button
                      className="glass p-6 rounded-2xl hover:bg-white/10 transition-colors text-left group w-full"
                      whileHover={{ y: -2 }}
                    >
                      <Target className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                      <h4 className="font-semibold text-foreground mb-2">Leaderboard</h4>
                      <p className="text-sm text-foreground/60">Top creators</p>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Digital Fingerprint Card */}
              <motion.div
                className="fingerprint-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-sm" />
                    </div>
                    <span className="font-serif font-bold text-primary text-sm tracking-wide">
                      NEON TECH
                    </span>
                  </div>
                  <div className="text-xs text-foreground/40 font-mono">
                    EST. 2025
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                    {currentUser.name}
                  </h2>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-foreground/60">Digital Creator</span>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      currentUser.tier === "Enterprise" ? "bg-violet/20 text-violet" :
                      currentUser.tier === "Pro" ? "bg-primary/20 text-primary" :
                      "bg-white/10 text-foreground/60"
                    }`}>
                      {currentUser.tier}
                    </div>
                  </div>
                  <div className="text-sm text-foreground/50">@{currentUser.handle}</div>
                </div>

                <div className="mb-6">
                  <div className="text-xs text-foreground/40 uppercase tracking-wider mb-2">
                    Fingerprint ID
                  </div>
                  <div className="text-lg font-mono text-foreground tracking-wider">
                    {currentUser.fingerprintId}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-xs text-foreground/40 uppercase tracking-wider mb-3">
                    Achievements
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.badges.slice(0, 3).map((badge, index) => (
                      <motion.div
                        key={index}
                        className="px-3 py-1 bg-violet/15 text-violet rounded-full text-xs font-medium"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1 + index * 0.1, type: "spring" }}
                      >
                        {badge}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-foreground/40" />
                    <span className="text-xs text-foreground/40">
                      Member since {currentUser.joinDate}
                    </span>
                  </div>
                  <div className="w-4 h-4 bg-primary/50 rounded-full animate-pulse" />
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                className="glass-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <h3 className="text-xl font-serif font-bold text-foreground mb-6">
                  Recent Activity
                </h3>
                
                <div className="space-y-4">
                  {[
                    { action: "New follower", detail: "Marcus Chen started following you", time: "2h ago" },
                    { action: "Post liked", detail: "Your latest post reached 234 likes", time: "4h ago" },
                    { action: "Profile viewed", detail: "15 new profile views from Milan", time: "6h ago" }
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3 p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1, duration: 0.4 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 group-hover:scale-125 transition-transform" />
                      <div className="flex-1">
                        <div className="font-medium text-foreground text-sm">
                          {activity.action}
                        </div>
                        <div className="text-foreground/60 text-sm">
                          {activity.detail}
                        </div>
                        <div className="text-foreground/40 text-xs mt-1">
                          {activity.time}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </AuraBackground>
  );
};

export default Dashboard;