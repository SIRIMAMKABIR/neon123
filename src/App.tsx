import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Feed from "./pages/Feed";
import Templates from "./pages/Templates";
import Builder from "./pages/Builder";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Leaderboard from "./pages/Leaderboard";
import Explore from "./pages/Explore";
import Referrals from "./pages/Referrals";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<PageTransition><Index /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
            <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/feed" element={<PageTransition><Feed /></PageTransition>} />
            <Route path="/templates" element={<PageTransition><Templates /></PageTransition>} />
            <Route path="/builder" element={<PageTransition><Builder /></PageTransition>} />
            <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
            <Route path="/profile/:id" element={<PageTransition><Profile /></PageTransition>} />
            <Route path="/messages" element={<PageTransition><Messages /></PageTransition>} />
            <Route path="/leaderboard" element={<PageTransition><Leaderboard /></PageTransition>} />
            <Route path="/explore" element={<PageTransition><Explore /></PageTransition>} />
            <Route path="/referrals" element={<PageTransition><Referrals /></PageTransition>} />
            <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
            <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;