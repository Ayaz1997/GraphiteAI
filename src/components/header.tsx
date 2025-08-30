import Link from 'next/link';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, Layers } from 'lucide-react';

const GraphiteIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12,2 L2,7 L12,12 L22,7 L12,2 Z" />
    <polyline points="2,17 12,22 22,17" />
    <polyline points="2,12 12,17 22,12" />
  </svg>
);


export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <GraphiteIcon className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">Graphite AI</span>
          </Link>
        </div>

        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <GraphiteIcon className="h-6 w-6" />
                    <span className="font-bold">Graphite AI</span>
                </Link>
                <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
                    <div className="flex flex-col space-y-3">
                        <Link href="/dashboard" className="text-foreground">Dashboard</Link>
                        <Link href="#features" className="text-foreground">Features</Link>
                    </div>
                </div>
            </SheetContent>
        </Sheet>


        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-foreground transition-colors hover:text-foreground/80">
              Dashboard
            </Link>
            <Link href="/#features" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground/80">
              Features
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://picsum.photos/100" alt="User avatar" data-ai-hint="person face" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
