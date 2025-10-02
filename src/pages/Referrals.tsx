import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Share, QrCode, Users, Gift, Star, Crown, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import NavBar from "@/components/NavBar";
import AuraBackground from "@/components/AuraBackground";
import { toast } from "sonner";

const Referrals = () => {
  const [referralCode] = useState("NEON-AMARA-2025");
  const [referralStats] = useState({
    invitesSent: 12,
    joined: 8,
    pointsEarned: 2400,
    currentStreak: 5
  });

  const milestones = [
    { count: 5, reward: "Neon Pioneer Badge", completed: true, icon: Star },
    { count: 10, reward: "Pro Template Access", completed: false, icon: Crown },
    { count: 25, reward: "Enterprise Features", completed: false, icon: Award },
    { count: 50, reward: "Lifetime Pro Access", completed: false, icon: Gift }
  ];

  const recentReferrals = [
    { name: "Marcus Chen", joined: "2 days ago", status: "active" },
    { name: "Isabella Rossi", joined: "1 week ago", status: "active" },
    { name: "David Kim", joined: "2 weeks ago", status: "active" },
    { name: "Sophie Laurent", joined: "3 weeks ago", status: "pending" }
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`https://neontech.com/join/${referralCode}`);
    toast("Referral link copied to clipboard! 🚀");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join Neon Tech",
        text: "Create your luxury digital fingerprint with Neon Tech",
        url: `https://neontech.com/join/${referralCode}`
      });
    } else {
      handleCopyCode();
    }
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
              <Gift className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Refer & Earn</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 leading-tight">
              Share the{" "}
              <span className="text-luxury">Excellence</span>
            </h1>
            
            <p className="text-xl text-foreground/70 font-light max-w-3xl mx-auto">
              Invite fellow creators to join Neon Tech and earn exclusive rewards for building our community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Referral Card */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              
              {/* Referral Code Card */}
              <div className="fingerprint-card">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-serif font-bold text-primary text-sm tracking-wide">
                      REFERRAL CODE
                    </span>
                  </div>
                  <motion.button
                    onClick={() => {/* Generate QR */}}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <QrCode className="w-5 h-5 text-foreground/60" />
                  </motion.button>
                </div>

                <div className="mb-6">
                  <div className="text-xs text-foreground/40 uppercase tracking-wider mb-2">
                    Your Unique Code
                  </div>
                  <div className="text-2xl font-mono font-bold text-foreground tracking-wider mb-4">
                    {referralCode}
                  </div>
                  <div className="text-sm text-foreground/60">
                    Share this code to invite others to Neon Tech
                  </div>
                </div>

                <div className="space-y-3">
                  <motion.button
                    onClick={handleCopyCode}
                    className="btn-neon w-full flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy Referral Link
                  </motion.button>

                  <motion.button
                    onClick={handleShare}
                    className="btn-glass w-full flex items-center justify-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Share with Friends
                  </motion.button>
                </div>
              </div>

              {/* Stats */}
              <motion.div
                className="glass-card"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h3 className="text-xl font-serif font-bold text-foreground mb-6">
                  Your Impact
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <motion.div
                      className="text-3xl font-bold text-primary mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                    >
                      {referralStats.invitesSent}
                    </motion.div>
                    <div className="text-sm text-foreground/60">Invites Sent</div>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-3xl font-bold text-violet mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.7, type: "spring" }}
                    >
                      {referralStats.joined}
                    </motion.div>
                    <div className="text-sm text-foreground/60">Joined</div>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-3xl font-bold text-crimson mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, type: "spring" }}
                    >
                      {referralStats.pointsEarned.toLocaleString()}
                    </motion.div>
                    <div className="text-sm text-foreground/60">Points Earned</div>
                  </div>
                  <div className="text-center">
                    <motion.div
                      className="text-3xl font-bold text-foreground mb-2"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9, type: "spring" }}
                    >
                      {referralStats.currentStreak}
                    </motion.div>
                    <div className="text-sm text-foreground/60">Day Streak</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Milestones & Recent */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              
              {/* Milestones */}
              <div className="glass-card">
                <h3 className="text-xl font-serif font-bold text-foreground mb-6">
                  Milestone Rewards
                </h3>
                
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${
                        milestone.completed 
                          ? "bg-green-500/10 border border-green-500/20" 
                          : "glass hover:bg-white/10"
                      }`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center space-x-4">
                        <motion.div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            milestone.completed
                              ? "bg-green-500/20"
                              : "bg-primary/20"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          animate={milestone.completed ? {
                            boxShadow: [
                              "0 0 10px rgba(52, 211, 153, 0.3)",
                              "0 0 20px rgba(52, 211, 153, 0.5)",
                              "0 0 10px rgba(52, 211, 153, 0.3)"
                            ]
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <milestone.icon className={`w-5 h-5 ${
                            milestone.completed ? "text-green-400" : "text-primary"
                          }`} />
                        </motion.div>
                        
                        <div>
                          <div className="font-medium text-foreground">
                            {milestone.count} Referrals
                          </div>
                          <div className="text-sm text-foreground/60">
                            {milestone.reward}
                          </div>
                        </div>
                      </div>
                      
                      <div className={`text-sm font-medium ${
                        milestone.completed ? "text-green-400" : "text-foreground/40"
                      }`}>
                        {milestone.completed ? "Unlocked" : `${referralStats.joined}/${milestone.count}`}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Recent Referrals */}
              <div className="glass-card">
                <h3 className="text-xl font-serif font-bold text-foreground mb-6">
                  Recent Referrals
                </h3>
                
                <div className="space-y-4">
                  {recentReferrals.map((referral, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between p-4 glass rounded-2xl hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary/30 to-violet/30 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-white">
                            {referral.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{referral.name}</div>
                          <div className="text-sm text-foreground/60">Joined {referral.joined}</div>
                        </div>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        referral.status === "active" 
                          ? "bg-green-500/20 text-green-400" 
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {referral.status}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AuraBackground>
  );
};

export default Referrals;