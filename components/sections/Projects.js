"use client";

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "AYUSHerbs: AI Plant Identification",
    description: "Innovative machine learning system for herbal plant recognition, leveraging advanced image analysis and AI technologies to provide instant botanical insights.",
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&h=400&fit=crop",
    tech: ["React", "TensorFlow.js", "Machine Learning", "Node.js"],
    liveUrl: "https://ayus-herb.vercel.app/",
    githubUrl: "https://github.com/TechWithAkash/AyusHerb.git",
    category: ["AI", "Machine Learning"]
  },
  {
    title: "Calorific-Snap: Nutritional AI Companion",
    description: "Cutting-edge nutrition analysis application using AI to instantly calculate calorie and nutrient content from food images, empowering health-conscious users.",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=400&fit=crop",
    tech: ["Next.js", "Machine Learning", "Computer Vision", "NodeJS"],
    liveUrl: "https://calorify-mu.vercel.app/",
    githubUrl: "https://github.com/TechWithAkash/calorify.git",
    category: ["AI", "Health Tech"]
  },
  {
    title: "Dia-Insight: Diabetes Prediction Platform",
    description: "Advanced web application utilizing state-of-the-art machine learning algorithms to provide early diabetes risk assessment through comprehensive data analysis.",
    image: "/dia.jpg",
    tech: ["Python", "Machine Learning", "Flask", "Data Science"],
    liveUrl: "#",
    githubUrl: "https://github.com/TechWithAkash/DiamondPricePrediction.git",
    category: ["Healthcare", "Predictive Analytics"]
  },
  {
    title: "DiamondPredict: Price Forecasting Solution",
    description: "Sophisticated machine learning model designed to accurately predict diamond prices by analyzing multiple characteristic parameters with high precision.",
    image: "/diamond.jpg",
    tech: ["Python", "Machine Learning", "Flask", "Data Analytics"],
    liveUrl: "#",
    githubUrl: "https://github.com/TechWithAkash/DiamondPricePrediction.git",
    category: ["Predictive Analytics", "Data Science"]
  }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState(null);

  const categories = Array.from(
    new Set(projects.flatMap(project => project.category))
  );

  const filteredProjects = activeCategory
    ? projects.filter(project => project.category.includes(activeCategory))
    : projects;

  return (
    <section id="projects" className="py-20 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative">
      <div className="absolute inset-0 opacity-10 bg-pattern"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Innovative Project Portfolio
          </h2>

          <div className="flex justify-center mb-12 space-x-4 flex-wrap gap-2">
            <Button 
              variant={activeCategory === null ? "default" : "outline"}
              onClick={() => setActiveCategory(null)}
              className="mb-2"
            >
              All Projects
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <Card 
                key={index} 
                className="overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:border-primary/20 border-2 border-transparent"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <Link href={project.liveUrl} target="_blank" className="w-full">
                      <Button variant="outline" size="sm" className="w-full">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live Demo
                      </Button>
                    </Link>
                    <Link href={project.githubUrl} target="_blank" className="w-full">
                      <Button variant="outline" size="sm" className="w-full">
                        <Github className="w-4 h-4 mr-2" />
                        Source Code
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="flex flex-wrap justify-center space-x-4 text-muted-foreground">
              <div className="flex items-center mb-2">
                <Zap className="mr-2 w-5 h-5 text-yellow-500" />
                <span>Innovative Solutions</span>
              </div>
              <div className="flex items-center mb-2">
                <Github className="mr-2 w-5 h-5 text-gray-500" />
                <span>Open Source Contributions</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
