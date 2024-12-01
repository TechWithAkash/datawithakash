import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, Code, Database, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [activeInterest, setActiveInterest] = useState(0);
  const interests = [
    "Data Science",
    "Software Development"
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveInterest((prev) => (prev + 1) % interests.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const interestIcons = [
    // <Globe key="domain" className="h-8 w-8 text-blue-500" />,
    <Database key="data" className="h-8 w-8 text-green-500" />,
    <Code key="software" className="h-8 w-8 text-purple-500" />
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <div className="absolute inset-0 opacity-10 bg-pattern"></div>
      <div className="container px-4 mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="relative w-40 h-40 mx-auto mb-8 group">
            <Image 
              src="/akash.png" 
              alt="Profile" 
              fill 
              className="rounded-full object-cover shadow-2xl group-hover:scale-105 transition-transform duration-300" 
              priority 
            />
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-full p-2 flex items-center space-x-2">
              {interestIcons.map((icon, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: activeInterest === index ? 1 : 0.5, 
                    scale: activeInterest === index ? 1.2 : 1 
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {icon}
                </motion.div>
              ))}
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Hi, I&apos;m Akash Vishwakarma
          </h1>

          <div className="flex items-center justify-center mb-4 space-x-2">
            <span className="text-xl md:text-2xl text-muted-foreground">Expert in</span>
            <AnimatePresence mode="wait">
              <motion.span
                key={activeInterest}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-xl md:text-2xl font-bold text-blue-600"
              >
                {interests[activeInterest]}
              </motion.span>
            </AnimatePresence>
          </div>

          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Transforming digital landscapes through innovative solutions and strategic insights
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700 transition-colors"
              onClick={scrollToProjects}
            >
              View My Work
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
              onClick={scrollToContact}
            >
              Hire Me
            </Button>
          </div>

          <div className="flex justify-center gap-6">
            {[
              { 
                href: "https://github.com/TechWithAkash", 
                icon: Github,
                color: "hover:text-gray-800"
              },
              { 
                href: "https://www.linkedin.com/in/akashvishwakarma2004/", 
                icon: Linkedin,
                color: "hover:text-blue-600"
              },
              { 
                href: "mailto:vishwakarmaakashav17@gmail.com", 
                icon: Mail,
                color: "hover:text-red-500"
              }
            ].map(({ href, icon: Icon, color }) => (
              <Link key={href} href={href}>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`text-muted-foreground ${color} transition-colors`}
                >
                  <Icon className="h-6 w-6" />
                </Button>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}