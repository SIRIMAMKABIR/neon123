import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Crown, TrendingUp, Users, Zap, Star, Award, ArrowUp, ArrowDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import NavBar from "@/components/NavBar";
import AuraBackground from "@/components/AuraBackground";
import usersData from "@/mock/users.json";

const Leaderboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("global");
  const [hoveredUser, setHoveredUser] = useState<string | null>(null);

  // Sort users by score for different periods
  const leaderboards = {
    global: [...usersData].sort((a, b) => b.score - a.score),
    week: [...usersData].sort((a, b) => b.followers - a.followers),
    rising: [...usersData].sort((a, b) => b.posts - a.posts)
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <motion.div
            className="relative"
            animate={{
              filter: [
                "drop-shadow(0 0 8px rgba(255, 213, 79, 0.6))",
                "drop-shadow(0 0 16px rgba(255, 213, 79, 0.8))",
                "drop-shadow(0 0 8px rgba(255, 213, 79, 0.6))"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Crown className="w-6 h-6" style={{ color: "#FFD54F" }} />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            animate={{
              filter: [
                "drop-shadow(0 0 6px rgba(140, 197, 255, 0.5))",
                "drop-shadow(0 0 12px rgba(140, 197, 255, 0.7))",
                "drop-shadow(0 0 6px rgba(140, 197, 255, 0.5))"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          >
            <Award className="w-6 h-6" style={{ color: "#8CC5FF" }} />
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            animate={{
              filter: [
                "drop-shadow(0 0 6px rgba(255, 85, 112, 0.5))",
                "drop-shadow(0 0 12px rgba(255, 85, 112, 0.7))",
                "drop-shadow(0 0 6px rgba(255, 85, 112, 0.5))"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          >
            <Star className="w-6 h-6" style={{ color: "#FF5570" }} />
          </motion.div>
        );
      default:
        return <span className="text-lg font-bold text-foreground/40">#{rank}</span>;
    }
  };

  const getTierGlow = (tier: string, rank: number) => {
    if (rank === 1) {
      return "ring-2 shadow-lg shadow-[#FFD54F]/40";
    }
    switch (tier) {
      case "Enterprise":
        return "ring-2 ring-primary/40 shadow-lg shadow-primary/20";
      case "Pro":
        return "ring-2 ring-primary/40 shadow-lg shadow-primary/20";
      default:
        return "ring-1 ring-white/20";
    }
  };

  const getGrowthIndicator = (index: number) => {
    const growth = Math.random() > 0.5;
    const change = Math.floor(Math.random() * 10) + 1;
    
    return (
      <div className={`flex items-center space-x-1 text-xs ${
        growth ? "text-green-400" : "text-red-400"
      }`}>
        {growth ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
        <span>{change}</span>
      </div>
    );
  };

  return (
    <AuraBackground variant="violet" intensity="medium">
      <NavBar />
      
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          
          {/* Hero */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 mb-8 px-6 py-3 glass rounded-full"
              whileHover={{ scale: 1.05 }}
            >
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Live Rankings</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
              The{" "}
              <span className="text-luxury">Leaderboard</span>
            </h1>
            
            <p className="text-xl text-foreground/70 font-light max-w-3xl mx-auto">
              Celebrating the creators who are shaping the future of digital excellence
            </p>
          </motion.div>

          {/* Leaderboard */}
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod} className="w-full">
              <TabsList className="glass grid w-full grid-cols-3 mb-8">
                <TabsTrigger 
                  value="global" 
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Global
                </TabsTrigger>
                <TabsTrigger 
                  value="week" 
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  This Week
                </TabsTrigger>
                <TabsTrigger 
                  value="rising" 
                  className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Rising
                </TabsTrigger>
              </TabsList>

              {Object.entries(leaderboards).map(([period, users]) => (
                <TabsContent key={period} value={period} className="space-y-4">
                  <AnimatePresence>
                    {users.map((user, index) => (
                      <motion.div
                        key={user.id}
                        className={`glass p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer group ${
                          index < 3 ? "border border-primary/20" : ""
                        }`}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.6 }}
                        whileHover={{ y: -2, scale: 1.01 }}
                        onHoverStart={() => setHoveredUser(user.id)}
                        onHoverEnd={() => setHoveredUser(null)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            {/* Rank */}
                            <motion.div
                              className="w-12 h-12 flex items-center justify-center"
                              whileHover={{ scale: 1.1 }}
                            >
                              {getRankIcon(index + 1)}
                            </motion.div>

                            {/* Avatar */}
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <Avatar className={`w-16 h-16 ${getTierGlow(user.tier, index + 1)}`}>
                                <img src={user.avatar} alt={user.name} />
                              </Avatar>
                            </motion.div>

                            {/* User Info */}
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                                  {user.name}
                                </h3>
                                {user.verified && (
                                  <motion.div
                                    className="w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
                                  >
                                    <div className="w-2 h-2 bg-white rounded-full" />
                                  </motion.div>
                                )}
                              </div>
                              <div className="text-foreground/60 text-sm mb-2">@{user.handle}</div>
                              <div className="flex items-center space-x-4 text-sm">
                                <span className="text-foreground/50">
                                  {user.followers.toLocaleString()} followers
                                </span>
                                <span className="text-foreground/50">
                                  {user.posts} posts
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Score & Growth */}
                          <div className="text-right">
                            <motion.div
                              className="text-2xl font-bold text-primary mb-1"
                              initial={{ opacity: 0, scale: 0.5 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.05, type: "spring" }}
                            >
                              {user.score.toLocaleString()}
                            </motion.div>
                            <div className="text-xs text-foreground/50 mb-2">points</div>
                            {getGrowthIndicator(index)}
                          </div>
                        </div>

                        {/* Badges */}
                        <AnimatePresence>
                          {hoveredUser === user.id && (
                            <motion.div
                              className="mt-4 pt-4 border-t border-white/10"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="flex flex-wrap gap-2">
                                {user.badges.map((badge, badgeIndex) => (
                                  <motion.div
                                    key={badgeIndex}
                                    className="px-3 py-1 rounded-full text-xs font-medium"
                                    style={{
                                      background: "linear-gradient(135deg, rgba(140, 197, 255, 0.15), rgba(255, 85, 112, 0.15))",
                                      color: "#8CC5FF",
                                      border: "1px solid rgba(140, 197, 255, 0.3)"
                                    }}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: badgeIndex * 0.05, duration: 0.2 }}
                                    whileHover={{
                                      boxShadow: "0 0 20px rgba(140, 197, 255, 0.4)"
                                    }}
                                  >
                                    {badge}
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Confetti for top 3 */}
                        {index < 3 && hoveredUser === user.id && (
                          <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          >
                            {[...Array(12)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-primary rounded-full"
                                style={{
                                  left: `${Math.random() * 100}%`,
                                  top: `${Math.random() * 100}%`,
                                }}
                                animate={{
                                  y: [0, -20, 20],
                                  x: [0, Math.random() * 40 - 20],
                                  opacity: [1, 1, 0],
                                  scale: [0, 1, 0],
                                }}
                                transition={{
                                  duration: 2,
                                  delay: i * 0.1,
                                  ease: "easeOut"
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">
              Ready to climb the{" "}
              <span className="text-luxury">leaderboard?</span>
            </h2>
            <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
              Create exceptional content, engage with the community, and watch your digital fingerprint rise
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/feed" className="btn-neon text-lg px-12 py-5 magnetic">
                Join the Community
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AuraBackground>
  );
};

export default Leaderboard;