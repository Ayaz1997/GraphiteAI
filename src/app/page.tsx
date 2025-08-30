import { Header } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Layers, Mountain, Palette, Pilcrow, Download } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: <Layers className="h-8 w-8 text-accent" />,
    title: 'Sketch to 3D Render',
    description: 'Instantly convert your 2D architectural sketches into detailed, low-resolution 3D models with our advanced AI.',
  },
  {
    icon: <Palette className="h-8 w-8 text-accent" />,
    title: 'Mood Board Integration',
    description: 'Guide the AI\'s aesthetic by uploading mood boards. Infuse your renders with specific styles, colors, and textures.',
  },
  {
    icon: <Pilcrow className="h-8 w-8 text-accent" />,
    title: 'Text Prompt Refinement',
    description: 'Fine-tune every detail of your model. Our AI intelligently incorporates your text-based feedback for precise adjustments.',
  },
  {
    icon: <Code className="h-8 w-8 text-accent" />,
    title: 'Multiple Angle Generation',
    description: 'Explore your design from every perspective. Generate various camera angles of your 3D model from a single sketch.',
  },
  {
    icon: <Mountain className="h-8 w-8 text-accent" />,
    title: 'High-Quality Rendering',
    description: 'Take your preferred model to the next level. Generate a high-resolution, photorealistic final render for presentations.',
  },
  {
    icon: <Download className="h-8 w-8 text-accent" />,
    title: 'Flexible Export Options',
    description: 'Export your final renders in standard formats like JPEG and PNG, ready for your portfolio or client presentations.',
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Graphite AI: From Sketch to Reality
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    The ultimate AI toolkit for architects and designers. Transform your creative vision into stunning 3D renders with unparalleled speed and control.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="font-semibold">
                    <Link href="/dashboard">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="font-semibold">
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
              </div>
              <Image
                src="https://picsum.photos/seed/arch/1200/800"
                width={1200}
                height={800}
                alt="Hero"
                data-ai-hint="architecture building"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              />
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
                  Build at the Speed of Thought
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our comprehensive suite of AI-powered tools is designed to seamlessly integrate into your creative workflow, accelerating your design process from concept to completion.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3 pt-12">
              {features.map((feature) => (
                <Card key={feature.title} className="shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="flex flex-row items-center gap-4">
                    {feature.icon}
                    <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 Graphite AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
