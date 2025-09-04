import { Button } from '@/components/ui/button';
import { Box, Bot, ScanSearch, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: <ScanSearch className="h-5 w-5 text-gray-500" />,
    label: 'Recognition',
  },
  {
    icon: <Bot className="h-5 w-5 text-gray-500" />,
    label: 'AI Processing',
  },
  {
    icon: <Box className="h-5 w-5 text-gray-500" />,
    label: '3D Rendering',
  },
];

const struggles = [
    {
      icon: "https://picsum.photos/seed/hourglass/64/64",
      iconHint: "hourglass sketch",
      title: "Time-consuming",
      description: "Traditional 3D modelling takes 8-12 hours per project",
    },
    {
      icon: "https://picsum.photos/seed/moneybag/64/64",
      iconHint: "money bag sketch",
      title: "Expensive software",
      description: "Professional tools cost $200-500/ month with steep learning curves",
    },
    {
      icon: "https://picsum.photos/seed/gear/64/64",
      iconHint: "gear sketch",
      title: "Complex workflow",
      description: "Multiple software switches from sketch → CAD → 3D rendering",
    },
]

const BackgroundGrid = () => (
    <div className="absolute inset-0 -z-10 h-full w-full bg-gray-50">
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{
            stroke: '#EAECF0',
            strokeWidth: '1',
            fill: 'none',
          }}
      >
        <defs>
          <pattern
            id="grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 80 0 L 0 0 0 80" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
  

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB] text-gray-900 font-body">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-gray-900"
            >
                <path d="M12,2 L2,7 L12,12 L22,7 L12,2 Z" />
                <polyline points="2,17 12,22 22,17" />
                <polyline points="2,12 12,17 22,12" />
            </svg>
            <span className="text-lg font-semibold text-gray-900">Graphite3D</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Home</Link>
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">How it works</Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">
                    Sign in
                </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative">
        <BackgroundGrid />
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-6">
              <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-gray-900">
                Transform Your Sketches <br /> Into Stunning 3D Models
              </h1>
              <p className="max-w-2xl text-lg text-gray-600">
                Graphite3D converts 2D architectural drawings and hand sketches into professional isometric 3D visualizations using advanced AI.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {features.map((feature) => (
                  <div key={feature.label} className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
                    {feature.icon}
                    <span className="text-sm font-medium text-gray-700">{feature.label}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" asChild className="bg-gray-900 text-white hover:bg-gray-800">
                <Link href="/dashboard">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Get Started for Free
                </Link>
              </Button>
              <div className="w-full max-w-4xl pt-12">
                <Image
                  src="https://picsum.photos/1200/800"
                  width={1200}
                  height={800}
                  alt="Architectural sketch to 3D model conversion"
                  data-ai-hint="isometric building"
                  className="mx-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-20 md:py-32 lg:py-40 bg-[#F9FAFB]">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="font-headline text-4xl md:text-5xl font-medium tracking-tight text-gray-800">
                Why Architects Struggle With <br /> Traditional 3D Visualization?
              </h2>
              <p className="max-w-2xl text-lg text-gray-500">
                2D plans don't effectively convey spatial concepts.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {struggles.map((struggle) => (
                    <div key={struggle.title} className="bg-white p-8 border border-gray-200 shadow-sm flex flex-col items-start text-left" style={{ borderRadius: '40px' }}>
                        <div className="bg-gray-100 p-3 rounded-lg mb-6">
                            <Image 
                                src={struggle.icon}
                                alt={`${struggle.title} icon`}
                                width={64}
                                height={64}
                                data-ai-hint={struggle.iconHint}
                                className="h-10 w-10"
                            />
                        </div>
                        <h3 className="font-headline text-xl font-semibold text-gray-900 mb-2">{struggle.title}</h3>
                        <p className="text-gray-600 text-base">{struggle.description}</p>
                    </div>
                ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="w-full border-t border-gray-200 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-6 px-4 md:px-6">
          <p className="text-sm text-gray-600">
            Powered by Google NanoBanana 🍌
          </p>
          <p className="text-sm text-gray-600">
            Created by Ayaz (hey@ayaz.me)
          </p>
        </div>
      </footer>
    </div>
  );
}
