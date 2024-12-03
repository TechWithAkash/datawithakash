"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Award, Trophy } from "lucide-react";

const experiences = [
  {
    title: "DevIgnite Hackathon Team Lead",
    organization: "DevIgnite",
    period: "2024",
    description: "Led development of Electric Route Optimizer application with innovative routing and energy efficiency algorithms.",
    type: "achievement",
    achievements: [
      "Developed Electric Route Optimizer application",
      "Created algorithm for suggesting optimal routes to users",
      "Implemented energy efficiency considerations in route calculations",
    ],
  },
  {
    title: "ScrollHacks Virtual Hackathon Team Lead",
    organization: "ScrollHacks",
    period: "2024",
    description: "Spearheaded the creation of AyushHerb, an AI-powered herbal medicine recommendation system.",
    type: "achievement",
    achievements: [
      "Created AyushHerb AI-powered herbal medicine recommendation system",
      "Developed AyushGuru feature for symptom-based medicine recommendations",
    ],
  },
  {
    title: "Bachelor of Engineering, Computer Engineering",
    organization: "SIES Graduate School Of Technology",
    period: "Sep 2024",
    description: "Pursuing comprehensive computer engineering education with a focus on innovative technology solutions.",
    type: "education",
    achievements: [
      "Computer Engineering Program",
      "Advanced coursework in software development and AI technologies",
    ],
  },
  {
    title: "Diploma in Computer Engineering",
    organization: "Government Polytechnic Thane",
    period: "Prior to Bachelor's",
    description: "Completed foundational computer engineering diploma program.",
    type: "education",
    achievements: [
      "Comprehensive technical education",
      "Strong foundation in computer engineering principles",
    ],
  },
];

const ExperienceCard = ({ experience, index }) => {
  const icons = {
    education: GraduationCap,
    leadership: Trophy,
    achievement: Award,
  };

  const Icon = icons[experience.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
    >
      <Card className="mb-4 hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center mb-3">
            <Icon className="mr-3 text-primary w-6 h-6" />
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {experience.title}
              </h3>
              <p className="text-sm text-gray-500">
                {experience.organization} • {experience.period}
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3">{experience.description}</p>

          {experience.achievements && (
            <div className="space-y-2">
              {experience.achievements.map((achievement, i) => (
                <Badge
                  key={i}
                  variant="secondary"
                  className="mr-2 mb-1 text-sm"
                >
                  {achievement}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function Experience() {
  return (
    <div className="container mx-auto px-4 md:px-16 py-8 bg-blue-50">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Achievements & Education
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiences.map((experience, index) => (
          <ExperienceCard key={index} experience={experience} index={index} />
        ))}
      </div>
    </div>
  );
}
