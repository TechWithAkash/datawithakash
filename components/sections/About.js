
import React from 'react';
import { motion } from "framer-motion";
import { 
  Code2, 
  Brain, 
  Database, 
  FileText, 
  Cpu, 
  Zap 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  const professionalSkills = [
    {
      icon: Database,
      title: "Data Science",
      description: "Advanced analytics and machine learning solutions using cutting-edge technologies",
      iconColor: "text-blue-500"
    },
    {
      icon: Code2,
      title: "Software Development",
      description: "Full-stack development with modern web technologies and robust architectural patterns",
      iconColor: "text-green-500"
    },
    {
      icon: Cpu,
      title: "Embedded Systems",
      description: "Innovative design and implementation of intelligent embedded computing solutions",
      iconColor: "text-purple-500"
    }
  ];

  return (
    <section id="about" className="py-10 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative">
      <div className="absolute inset-0 opacity-10 bg-pattern"></div>
      
      <div className="container px-4 md:px-36 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            About My Professional Journey
          </h2>

          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              As a dedicated Data Science Enthusiast pursuing a Computer Engineering degree, 
              I&apos;m committed to pushing the boundaries of technological innovation. My expertise 
              spans data science, software development, and embedded systems, leveraging 
              advanced technologies to solve complex challenges.
            </p>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Proficient in Python, JavaScript, NextJS, ReactJS, and NodeJS, I excel in 
              transforming complex data into meaningful insights using TensorFlow and 
              scikit-learn. My approach combines technical prowess with collaborative 
              problem-solving and a relentless pursuit of excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            {professionalSkills.map(({ icon: Icon, title, description, iconColor }, index) => (
              <Card 
                key={title} 
                className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardContent className="pt-8 pb-6">
                  <div className="text-center">
                    <div className="mb-6 flex justify-center">
                      <div className={`p-4 rounded-full bg-${iconColor.split('-')[1]}-50`}>
                        <Icon className={`w-12 h-12 ${iconColor}`} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="flex justify-center space-x-4 text-muted-foreground">
              <div className="flex items-center">
                <FileText className="mr-2 w-5 h-5 text-blue-500" />
                <span>Data-Driven Solutions</span>
              </div>
              <div className="flex items-center">
                <Zap className="mr-2 w-5 h-5 text-yellow-500" />
                <span>Innovative Approaches</span>
              </div>
              <div className="flex items-center">
                <Brain className="mr-2 w-5 h-5 text-purple-500" />
                <span>Continuous Learning</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}