import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Send, Phone, Video, MoveHorizontal as MoreHorizontal, Paperclip, Smile, Circle, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import NavBar from "@/components/NavBar";
import AuraBackground from "@/components/AuraBackground";
import usersData from "@/mock/users.json";
import { formatDistanceToNow } from "date-fns";
import { MessageCircle } from "lucide-react";

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: "text" | "image" | "file";
  read: boolean;
}

interface Conversation {
  id: string;
  user: typeof usersData[0];
  lastMessage: Message;
  unreadCount: number;
  isOnline: boolean;
}

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock conversations
  const conversations: Conversation[] = usersData.slice(1).map((user, index) => ({
    id: user.id,
    user,
    lastMessage: {
      id: `msg-${index}`,
      senderId: Math.random() > 0.5 ? user.id : "1",
      content: [
        "Hey! Love your latest post about digital identity 🔥",
        "Thanks for the follow! Your work is incredible",
        "Would love to collaborate on a project sometime",
        "Just saw your feature in Design Letter - congrats!",
        "Your template designs are absolutely stunning"
      ][index % 5],
      timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
      type: "text",
      read: Math.random() > 0.3
    },
    unreadCount: Math.floor(Math.random() * 3),
    isOnline: Math.random() > 0.4
  }));

  const selectedUser = conversations.find(c => c.id === selectedConversation)?.user;

  // Mock messages for selected conversation
  const messages: Message[] = selectedConversation ? [
    {
      id: "1",
      senderId: selectedConversation,
      content: "Hey! I saw your latest project and I'm absolutely blown away by the attention to detail.",
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      type: "text",
      read: true
    },
    {
      id: "2",
      senderId: "1",
      content: "Thank you so much! That means a lot coming from you. Your work has been a huge inspiration.",
      timestamp: new Date(Date.now() - 3300000).toISOString(),
      type: "text",
      read: true
    },
    {
      id: "3",
      senderId: selectedConversation,
      content: "Would love to collaborate on something together. I think our styles would complement each other perfectly.",
      timestamp: new Date(Date.now() - 3000000).toISOString(),
      type: "text",
      read: true
    },
    {
      id: "4",
      senderId: "1",
      content: "I'd love that! Let's set up a call this week to discuss some ideas.",
      timestamp: new Date(Date.now() - 2700000).toISOString(),
      type: "text",
      read: true
    }
  ] : [];

  const handleSendMessage = () =>  {
    if (!newMessage.trim()) return;
    // Mock sending message
    setNewMessage("");
  };

  const filteredConversations = conversations.filter(conv =>
    searchQuery === "" ||
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.user.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AuraBackground variant="blue" intensity="subtle">
      <NavBar />
      
      <div className="pt-24 min-h-screen">
        <div className="container mx-auto px-6 py-8 max-w-7xl h-[calc(100vh-8rem)]">
          
          <motion.div
            className="glass rounded-3xl overflow-hidden h-full flex"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            
            {/* Conversations Sidebar */}
            <div className={`${selectedConversation ? 'hidden lg:flex' : 'flex'} w-full lg:w-96 border-r border-white/10 flex-col`}>
              
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <motion.h1
                  className="text-2xl font-serif font-bold text-foreground mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Messages
                </motion.h1>
                
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/40" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="pl-12 glass border-white/20 bg-white/5"
                  />
                </motion.div>
              </div>
              
              {/* Conversations List */}
              <ScrollArea className="flex-1">
                <div className="p-4 space-y-2">
                  {filteredConversations.map((conv, index) => (
                    <motion.div
                      key={conv.id}
                      onClick={() => setSelectedConversation(conv.id)}
                      className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 group ${
                        selectedConversation === conv.id
                          ? 'bg-primary/20 border border-primary/30'
                          : 'hover:bg-white/5'
                      }`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12 ring-1 ring-white/20">
                            <img src={conv.user.avatar} alt={conv.user.name} />
                          </Avatar>
                          {conv.isOnline && (
                            <motion.div
                              className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.05, type: "spring" }}
                            />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                              {conv.user.name}
                            </h3>
                            <span className="text-xs text-foreground/50">
                              {formatDistanceToNow(new Date(conv.lastMessage.timestamp), { addSuffix: true })}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-foreground/60 truncate">
                              {conv.lastMessage.content}
                            </p>
                            {conv.unreadCount > 0 && (
                              <motion.div
                                className="w-5 h-5 bg-primary rounded-full flex items-center justify-center ml-2"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.6 + index * 0.05, type: "spring" }}
                              >
                                <span className="text-xs text-white font-bold">
                                  {conv.unreadCount}
                                </span>
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className={`${selectedConversation ? 'flex' : 'hidden lg:flex'} flex-1 flex-col`}>
              
              {selectedUser ? (
                <>
                  {/* Chat Header */}
                  <div className="p-6 border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setSelectedConversation(null)}
                        className="lg:hidden p-2 hover:bg-white/10 rounded-xl transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5 text-foreground" />
                      </button>
                      
                      <div className="relative">
                        <Avatar className="w-12 h-12 ring-2 ring-primary/30">
                          <img src={selectedUser.avatar} alt={selectedUser.name} />
                        </Avatar>
                        <motion.div
                          className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-background"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </div>
                      
                      <div>
                        <h2 className="font-serif font-bold text-foreground">
                          {selectedUser.name}
                        </h2>
                        <div className="flex items-center space-x-2 text-sm text-foreground/60">
                          <Circle className="w-2 h-2 fill-green-400 text-green-400" />
                          <span>Online</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <motion.button
                        className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Phone className="w-5 h-5 text-foreground/60" />
                      </motion.button>
                      <motion.button
                        className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Video className="w-5 h-5 text-foreground/60" />
                      </motion.button>
                      <motion.button
                        className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <MoreHorizontal className="w-5 h-5 text-foreground/60" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-6">
                    <div className="space-y-6">
                      <AnimatePresence>
                        {messages.map((message, index) => (
                          <motion.div
                            key={message.id}
                            className={`flex ${
                              message.senderId === "1" ? 'justify-end' : 'justify-start'
                            }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                          >
                            <motion.div
                              className={`max-w-xs lg:max-w-md px-6 py-4 rounded-3xl ${
                                message.senderId === "1"
                                  ? 'bg-primary text-white'
                                  : 'glass text-foreground'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              transition={{ type: "spring", stiffness: 300 }}
                            >
                              <p className="text-sm leading-relaxed">{message.content}</p>
                              <p className={`text-xs mt-2 ${
                                message.senderId === "1" 
                                  ? 'text-white/70' 
                                  : 'text-foreground/50'
                              }`}>
                                {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                              </p>
                            </motion.div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-6 border-t border-white/10">
                    <div className="flex items-center space-x-4">
                      <motion.button
                        className="p-3 hover:bg-white/10 rounded-xl transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Paperclip className="w-5 h-5 text-foreground/60" />
                      </motion.button>
                      
                      <div className="flex-1 relative">
                        <Input
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="glass border-white/20 bg-white/5 pr-12"
                          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                        <motion.button
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/10 rounded-lg transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Smile className="w-4 h-4 text-foreground/60" />
                        </motion.button>
                      </div>
                      
                      <motion.button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim()}
                        className="btn-neon px-6 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: newMessage.trim() ? 1.05 : 1 }}
                        whileTap={{ scale: newMessage.trim() ? 0.95 : 1 }}
                      >
                        <Send className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </>
              ) : (
                /* No Chat Selected */
                <div className="flex-1 flex items-center justify-center">
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="w-24 h-24 bg-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-6"
                      animate={{ 
                        boxShadow: [
                          "0 0 20px rgba(140, 197, 255, 0.2)",
                          "0 0 40px rgba(140, 197, 255, 0.4)",
                          "0 0 20px rgba(140, 197, 255, 0.2)"
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <MessageCircle className="w-12 h-12 text-primary" />
                    </motion.div>
                    <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                      Select a conversation
                    </h2>
                    <p className="text-foreground/60 max-w-md">
                      Choose from your existing conversations or start a new one with fellow creators
                    </p>
                  </motion.div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AuraBackground>
  );
};

export default Messages;