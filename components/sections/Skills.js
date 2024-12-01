"use client";

import React from 'react';
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Code, 
  Server, 
  Database, 
  Brain, 
  GitBranch, 
  Zap
} from "lucide-react";

const skillCategories = {
  programmingLanguages: [
    { name: "Python", level: 90, icon: "💻" },
    { name: "JavaScript", level: 85, icon: "✨" },
    { name: "TypeScript", level: 80, icon: "🔷" }
  ],
  webTechnologies: [
    { name: "ReactJS", level: 90, icon: "⚛️" },
    { name: "NextJS", level: 85, icon: "🌐" },
    { name: "TailwindCSS", level: 88, icon: "🎨" }
  ],
  databases: [
    { name: "MongoDB", level: 80, icon: "🍃" },
    { name: "PostgreSQL", level: 75, icon: "💾" },
    { name: "Firebase", level: 70, icon: "🔥" }
  ],
  aiAndSpecialties: [
    { name: "Machine Learning", level: 85, icon: "🤖" },
    { name: "Deep Learning", level: 80, icon: "🧠" },
    { name: "Computer Vision", level: 75, icon: "👁️" }
  ]
};

// SkillCard component
const SkillCard = ({ title, skills, icon: Icon }) => {
  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 border-2 border-transparent hover:border-primary/20">
      <CardHeader className="pb-0">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-blue-50 group-hover:bg-blue-100 rounded-full transition-colors">
            <Icon className="w-8 h-8 text-blue-600 group-hover:text-blue-700" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-blue-800 transition-colors">
            {title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {skills.map((skill, index) => (
            <div key={index} className="group">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <span className="font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
                    {skill.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
              <Progress 
                value={skill.level} 
                className="h-2.5 bg-blue-100 group-hover:bg-blue-200 transition-colors"
                indicatorClassName="bg-blue-600 group-hover:bg-blue-700"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function Skills() {
  const categoryDetails = [
    { 
      name: "Programming Languages", 
      icon: Code, 
      skills: skillCategories.programmingLanguages 
    },
    { 
      name: "Web Technologies", 
      icon: Server, 
      skills: skillCategories.webTechnologies 
    },
    { 
      name: "Databases", 
      icon: Database, 
      skills: skillCategories.databases 
    },
    { 
      name: "AI & Specialties", 
      icon: Brain, 
      skills: skillCategories.aiAndSpecialties 
    }
  ];

  return (
    <section 
      id="skills" 
      className="py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10 bg-pattern pointer-events-none"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-800 
            bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Technical Expertise & Skill Landscape
          </h2>

          {/* Responsive Grid with Hover Effects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {categoryDetails.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
              >
                <SkillCard
                  title={category.name}
                  skills={category.skills}
                  icon={category.icon}
                />
              </motion.div>
            ))}
          </div>

          {/* Footer Annotations */}
          <div className="mt-16 text-center">
            <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
              <div className="flex items-center space-x-2 hover:text-yellow-600 transition-colors">
                <Zap className="w-5 h-5 text-yellow-500" />
                <span className="font-medium">Continuous Learning</span>
              </div>
              <div className="flex items-center space-x-2 hover:text-blue-600 transition-colors">
                <GitBranch className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Collaborative Development</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
