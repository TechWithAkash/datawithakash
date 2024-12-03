// "use client";

// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";

// export default function Contact() {
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Form submission logic will be added later
//   };

//   return (
//     <section id="contact" className="py-20 bg-blue-50">
//       <div className="container px-4 mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Get In Touch</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             <div>
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Contact Information</CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-4">
//                   <div className="flex items-center gap-3">
//                     <Mail className="w-5 h-5 text-primary" />
//                     <span>vishwakarmaakashav17@gmail.com</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <Phone className="w-5 h-5 text-primary" />
//                     <span>+91 98765 43210</span>
//                   </div>
//                   <div className="flex items-center gap-3">
//                     <MapPin className="w-5 h-5 text-primary" />
//                     <span>Mumbai, India</span>
//                   </div>
//                   <div className="flex gap-4 mt-6">
//                     <Button variant="ghost" size="icon">
//                       <Github className="h-5 w-5" />
//                     </Button>
//                     <Button variant="ghost" size="icon">
//                       <Linkedin className="h-5 w-5" />
//                     </Button>
//                     <Button variant="ghost" size="icon">
//                       <Mail className="h-5 w-5" />
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             <Card>
//               <CardContent className="pt-6">
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Input placeholder="First Name" />
//                     </div>
//                     <div className="space-y-2">
//                       <Input placeholder="Last Name" />
//                     </div>
//                   </div>
//                   <div className="space-y-2">
//                     <Input type="email" placeholder="Email" />
//                   </div>
//                   <div className="space-y-2">
//                     <Textarea placeholder="Your Message" className="min-h-[150px]" />
//                   </div>
//                   <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
//                     Send Message
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Icons
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Send,
  AlertCircle 
} from "lucide-react";

// Form Validation Schema
const ContactFormSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(500, { message: "Message cannot exceed 500 characters" })
});

export default function ContactForm() {
  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // Validation errors state
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes with validation
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [errors]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      const validationResult = ContactFormSchema.safeParse(formData);

      if (!validationResult.success) {
        // Set validation errors
        const validationErrors = validationResult.error.flatten().fieldErrors;
        setErrors(validationErrors);
        
        // Show toast notification
        toast.error('Please correct the form errors', {
          icon: <AlertCircle className="text-red-500" />,
        });
        
        setIsSubmitting(false);
        return;
      }

      // Send form data to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        // Success handling
        toast.success('Message sent successfully!', {
          duration: 4000,
          position: 'top-right',
          icon: '✉️',
        });

        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
      } else {
        // Error handling
        toast.error(result.message || 'Failed to send message', {
          icon: <AlertCircle className="text-red-500" />,
        });
      }
    } catch (error) {
      // Network or unexpected error
      toast.error('An unexpected error occurred. Please try again.', {
        icon: <AlertCircle className="text-red-500" />,
      });
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <Toaster />
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Contact Information</h2>
              
              <div className="space-y-4">
                <ContactInfoItem 
                  icon={<Mail className="text-blue-500" />} 
                  text="vishwakarmaakashav17@gmail.com" 
                />
                <ContactInfoItem 
                  icon={<Phone className="text-green-500" />} 
                  text="+91 98765 43210" 
                />
                <ContactInfoItem 
                  icon={<MapPin className="text-red-500" />} 
                  text="Mumbai, India" 
                />
              </div>

              {/* Social Links */}
              <div className="mt-6 flex space-x-4">
                <SocialLink href="#" icon={<Github />} />
                <SocialLink href="#" icon={<Linkedin />} />
                <SocialLink href="#" icon={<Mail />} />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={errors.firstName ? "border-red-500" : ""}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={errors.lastName ? "border-red-500" : ""}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`min-h-[150px] ${errors.message ? "border-red-500" : ""}`}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Helper Components
const ContactInfoItem = ({ 
  icon, 
  text 
}) => (
  <div className="flex items-center space-x-3">
    {icon}
    <span className="text-gray-700">{text}</span>
  </div>
);

const SocialLink = ({ 
  href, 
  icon 
}) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="text-gray-600 hover:text-blue-500 transition-colors"
  >
    {icon}
  </a>
);
