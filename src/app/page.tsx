
import { Button } from '@/components/ui/button';
import { Box, Bot, ScanSearch, Sparkles, Check, PlusCircle, MinusCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ImageComparison } from '@/components/image-comparison';
import { TryItOut } from '@/components/try-it-out';
import './try-it-out.css';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

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

const professionals = [
    {
      icon: "https://picsum.photos/seed/architect/64/64",
      iconHint: "architect sketch",
      title: "Architects",
      description: "Impress clients with instant 3D previews during meetings",
    },
    {
      icon: "https://picsum.photos/seed/student/64/64",
      iconHint: "student sketch",
      title: "Students",
      description: "Transform homework sketches into portfolio-worthy 3D models",
    },
    {
      icon: "https://picsum.photos/seed/estate/64/64",
      iconHint: "real estate sketch",
      title: "Real Estate",
      description: "Create compelling property marketing materials from floor plans",
    },
];

const howItWorksSteps = [
    {
      number: "1",
      title: "Upload a floor plan",
      description: "Upload hand-drawn sketches or existing 2D plans",
    },
    {
      number: "2",
      title: "Instant 3D Generation",
      description: "AI creates professional isometric 3D models in seconds",
    },
    {
      number: "3",
      title: "Professional Output",
      description: "Export high-resolution images perfect for client presentations",
    },
  ];

  const pricingPlans = [
    {
      name: "Free",
      price: null,
      credits: "5 credits",
      features: [
        "5 conversions",
        "No credit card required",
        "Basic support",
        "Standard quality exports",
      ],
      buttonText: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "$19",
      price: 19,
      credits: "30 Credits",
      features: [
        "30 conversions",
        "Fast processing",
        "High-res exports",
        "Email support",
      ],
      buttonText: "Get Started",
      highlighted: true,
    },
    {
      name: "$99",
      price: 99,
      credits: "200 Credits",
      features: [
        "200 conversions",
        "Fast processing",
        "High-res exports",
        "Email support",
      ],
      buttonText: "Get Started",
      highlighted: false,
    },
  ];

  const faqs = [
    {
      question: "Is there a free trial available?",
      answer: "Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.",
    },
    {
      question: "Can I change my plan later?",
      answer: "Yes, you can upgrade, downgrade or cancel your plan at any time.",
    },
    {
      question: "What is your cancellation policy?",
      answer: "You can cancel your subscription at any time. Your subscription will remain active until the end of the current billing cycle.",
    },
    {
      question: "Can other info be added to an invoice?",
      answer: "Yes, you can add custom information to your invoices, such as your company's address and VAT number.",
    },
    {
      question: "How does billing work?",
      answer: "We bill you at the beginning of each billing cycle. You can pay with a credit card.",
    },
    {
      question: "How do I change my account email?",
      answer: "You can change your account email from your account settings page.",
    },
  ]

const BackgroundGrid = () => (
    <div className="absolute inset-0 -z-10 h-full w-full bg-transparent">
        <div className="relative h-full w-full">
            <div className="absolute bottom-0 left-20 right-20 h-px bg-border"></div>
            <div className="absolute top-32 left-0 right-0 h-px bg-border"></div>
            <div className="absolute top-20 bottom-0 left-20 w-px bg-border"></div>
            <div className="absolute top-20 bottom-0 right-20 w-px bg-border"></div>
            <div className="absolute top-[120px] left-[72px] h-4 w-4 -translate-x-1/2 -translate-y-1/2 border bg-background"></div>
            <div className="absolute top-[120px] right-[72px] h-4 w-4 -translate-x-1/2 -translate-y-1/2 border bg-background"></div>
            <div className="absolute bottom-0 left-[80px] h-4 w-4 -translate-x-1/2 translate-y-1/2 border bg-background"></div>
            <div className="absolute bottom-0 right-[80px] h-4 w-4 translate-x-1/2 translate-y-1/2 border bg-background"></div>
        </div>
    </div>
  );


export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB] text-gray-900 font-body">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-40">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" width={24} height={24} alt="Graphite3D Logo" />
            <span className="text-lg font-semibold text-gray-900">Graphite3D</span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Home</Link>
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">How it works</Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild className="rounded-full">
                <Link href="/dashboard">
                    Sign in
                </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative">
        <BackgroundGrid />
        <section className="w-full py-20 md:py-24">
          <div className="container mx-auto px-40">
            <div className="flex flex-col items-center text-center space-y-6">
              <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-gray-900">
                Transform Your Sketches <br /> Into Stunning 3D Models
              </h1>
              <p className="max-w-2xl text-lg text-gray-600">
                Graphite3D converts 2D architectural drawings and hand sketches into professional isometric 3D visualizations using advanced AI.
              </p>
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 rounded-full border border-gray-200 px-10 py-6 shadow-sm bg-transparent">
                <div className="flex items-center gap-3">
                    <ScanSearch className="h-5 w-5 text-gray-700" />
                    <span className="text-sm font-medium text-gray-700">Recognition</span>
                </div>
                <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
                <div className="flex items-center gap-3">
                    <Bot className="h-5 w-5 text-gray-700" />
                    <span className="text-sm font-medium text-gray-700">AI Processing</span>
                </div>
                <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
                <div className="flex items-center gap-3">
                    <Box className="h-5 w-5 text-gray-700" />
                    <span className="text-sm font-medium text-gray-700">3D Rendering</span>
                </div>
              </div>
              <Button size="lg" asChild className="bg-gray-900 text-white hover:bg-gray-800 rounded-full">
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

        <section id="features" className="w-full py-16 md:py-24">
          <div className="container mx-auto px-40">
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
                    <div key={struggle.title} className="bg-white p-8 pb-16 border border-gray-200 shadow-sm flex flex-col items-start text-left" style={{ borderRadius: '40px' }}>
                        <div className="mb-6">
                            <Image
                                src={struggle.icon}
                                alt={`${struggle.title} icon`}
                                width={64}
                                height={64}
                                data-ai-hint={struggle.iconHint}
                                className="h-16 w-16 rounded-[16px]"
                            />
                        </div>
                        <h3 className="font-body text-xl font-semibold text-gray-900 mb-2">{struggle.title}</h3>
                        <p className="text-secondary-foreground text-base">{struggle.description}</p>
                    </div>
                ))}
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24">
            <div className="container mx-auto px-40">
                <div className="flex flex-col items-center text-center space-y-4">
                    <h2 className="font-headline text-4xl md:text-5xl font-medium tracking-tight text-gray-800">
                        No More Struggle Using Graphite3D
                    </h2>
                    <p className="max-w-2xl text-lg text-gray-500">
                        Transform any floor plan or drawing into striking, presentation-ready 3D imagery-no complex software required.
                    </p>
                </div>
                <div className="mt-12 max-w-5xl mx-auto">
                    <ImageComparison
                        before="https://picsum.photos/seed/floorplan/1200/800"
                        after="https://picsum.photos/seed/render/1200/800"
                        beforeHint="2d floorplan"
                        afterHint="3d render"
                    />
                </div>
            </div>
        </section>

        <section className="w-full py-16 md:py-24">
            <div className="container mx-auto px-40">
              <div className="flex flex-col items-center text-center space-y-4 mb-16">
                <h2 className="font-headline text-4xl md:text-5xl font-medium tracking-tight text-gray-800">
                  How It Works?
                </h2>
                <p className="max-w-2xl text-lg text-gray-500">
                  From Sketch to 3D in Three Simple Steps.
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="flex flex-col gap-12">
                  {howItWorksSteps.map((step) => (
                    <div key={step.number} className="flex items-start gap-8">
                      <div className="font-headline text-8xl text-gray-200 leading-none">
                        {step.number}
                      </div>
                      <div className="pt-2">
                        <h3 className="font-headline text-2xl font-medium text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="relative aspect-video w-full rounded-2xl bg-gray-200 overflow-hidden shadow-2xl">
                    <video
                      src="https://framerusercontent.com/assets/5W2B3c5sA1E5oY2h3cE3iYwY.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
        </section>

        <TryItOut />

        <section className="w-full py-16 md:py-24">
          <div className="container mx-auto px-40">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="font-headline text-4xl md:text-5xl font-medium tracking-tight text-gray-800">
                Built For Design Professionals
              </h2>
              <p className="max-w-3xl text-lg text-gray-500">
                Discover what makes Graphite3D different from other 3D image generation - a leading choice for Architects, Students and Real Estate.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                {professionals.map((pro) => (
                    <div key={pro.title} className="bg-white p-8 pb-16 border border-gray-200 shadow-sm flex flex-col items-start text-left" style={{ borderRadius: '40px' }}>
                        <div className="mb-6">
                            <Image
                                src={pro.icon}
                                alt={`${pro.title} icon`}
                                width={64}
                                height={64}
                                data-ai-hint={pro.iconHint}
                                className="h-16 w-16 rounded-[16px]"
                            />
                        </div>
                        <h3 className="font-body text-xl font-semibold text-gray-900 mb-2">{pro.title}</h3>
                        <p className="text-secondary-foreground text-base">{pro.description}</p>
                    </div>
                ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-16 md:py-24">
          <div className="container mx-auto px-40">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="font-headline text-4xl md:text-5xl font-medium tracking-tight text-gray-800">
                Plans That Fit Your Scale
              </h2>
              <p className="max-w-2xl text-lg text-gray-500">
                Try converting with Free credits or choose the one that suits your needs.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {pricingPlans.map((plan) => (
                <div
                  key={plan.name}
                  className={`p-8 flex flex-col h-full ${
                    plan.highlighted
                      ? 'bg-[#161B26] text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                  style={{ borderRadius: '40px' }}
                >
                  <div className="flex-grow">
                    <h3 className="font-headline text-4xl mb-2">{plan.name}</h3>
                    <p className={`mb-6 ${plan.highlighted ? 'text-gray-400' : 'text-gray-600'}`}>
                      {plan.credits}
                    </p>
                    <ul className="space-y-4">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className={`mr-4 mt-1 ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-8">
                    <Button
                      size="lg"
                      className={`w-full rounded-full ${
                        plan.highlighted
                          ? 'bg-white text-gray-900 hover:bg-gray-200'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      {plan.buttonText}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-16 md:py-24">
            <div className="container mx-auto px-40">
                <div className="flex flex-col items-center text-center space-y-4 mb-16">
                    <h2 className="font-headline text-4xl md:text-5xl font-medium tracking-tight text-gray-800">
                        All Your Questions Answered
                    </h2>
                    <p className="max-w-2xl text-lg text-gray-500">
                        Everything you need to know about the product and billing.
                    </p>
                </div>
                <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto" defaultValue='item-0'>
                {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-b">
                    <AccordionTrigger className="text-lg font-medium text-gray-900 hover:no-underline group">
                        <span className="flex items-center gap-4">
                            <PlusCircle className="h-6 w-6 text-gray-400 group-data-[state=open]:hidden" />
                            <MinusCircle className="h-6 w-6 text-gray-400 hidden group-data-[state=open]:block" />
                            {faq.question}
                        </span>
                    </AccordionTrigger>
                    <AccordionContent className="pt-2">
                        <div className="bg-[#F2F4F7] p-6 rounded-2xl text-gray-600 text-base">
                            {faq.answer}
                        </div>
                    </AccordionContent>
                    </AccordionItem>
                ))}
                </Accordion>
            </div>
        </section>

      </main>

      <footer className="w-full border-t border-gray-200 bg-white">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-6 px-40">
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
