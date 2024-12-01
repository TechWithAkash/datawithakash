import localFont from "next/font/local";
import "./globals.css";
import  {Poppins} from "next/font/google"
const poppins = Poppins({
  weight: ['400', '600', '700'], // Most common weights
  subsets: ['latin'],
  display: 'swap', // Improves performance
  variable: '--font-poppins' // Allows using in Tailwind
});


export const metadata = {
  title: {
    default: 'Akash Vishwakarma | Software Engineer & Innovator',
    template: '%s | Akash Vishwakarma Portfolio'
  },
  description: 'Portfolio of Akash Vishwakarma - Innovative Software Engineer specializing in AI, Web Development, and Hackathon Solutions',
  applicationName: 'Akash Vishwakarma Portfolio',
  keywords: [
    'Software Engineer',
    'Web Development',
    'AI',
    'Hackathon',
    'React',
    'Next.js',
    'TypeScript',
    'Full Stack Developer'
  ],
  authors: [{ name: 'Akash Vishwakarma' }],
  creator: 'Akash Vishwakarma',
  publisher: 'Akash Vishwakarma',
  generator: 'Next.js',
  openGraph: {
    title: 'Akash Vishwakarma | Software Engineer',
    description: 'Portfolio showcasing innovative tech solutions and hackathon achievements',
    url: 'https://www.akashvishwakarma.com', // Replace with your actual portfolio URL
    siteName: 'Akash Vishwakarma Portfolio',
    type: 'website',
    locale: 'en_US'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Akash Vishwakarma | Software Engineer',
    description: 'Portfolio showcasing innovative tech solutions and hackathon achievements',
    // creator: '@your_twitter_handle', // Uncomment and add your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-site-verification-code', // Add your Google Search Console verification code
    // bing: 'your-bing-verification-code', // Optional
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${poppins.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
