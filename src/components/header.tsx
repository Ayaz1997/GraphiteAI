import Link from 'next/link';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-lg">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo.png" width={120} height={32} alt="Graphite3D Logo" />
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Home</Link>
            <Link href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">Features</Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">How it works</Link>
            <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">Pricing</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
                <Link href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none" className="mr-2 h-4 w-4">
                        <path d="M10 10.6667C10.3536 10.6667 10.6667 10.3536 10.6667 10C10.6667 9.6464 10.3536 9.33333 10 9.33333C9.6464 9.33333 9.33333 9.6464 9.33333 10C9.33333 10.3536 9.6464 10.6667 10 10.6667Z" stroke="#475467" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.99996 10.6667C6.35356 10.6667 6.66663 10.3536 6.66663 10C6.66663 9.6464 6.35356 9.33333 5.99996 9.33333C5.64636 9.33333 5.33329 9.6464 5.33329 10C5.33329 10.3536 5.64636 10.6667 5.99996 10.6667Z" stroke="#475467" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 5.33333C2 4.97973 2.14044 4.64057 2.38098 4.39086C2.62152 4.14114 2.96069 4 3.33333 4H12.6667C13.0393 4 13.3785 4.14114 13.619 4.39086C13.8596 4.64057 14 4.97973 14 5.33333V12C14 12.3536 13.8596 12.6928 13.619 12.9425C13.3785 13.1922 13.0393 13.3333 12.6667 13.3333H3.33333C2.96069 13.3333 2.62152 13.1922 2.38098 12.9425C2.14044 12.6928 2 12.3536 2 12V5.33333Z" stroke="#475467" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Sign in
                </Link>
            </Button>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="md:hidden" size="icon">
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <Link href="/" className="flex items-center gap-2 mb-8">
                        <Image src="/images/logo.png" width={120} height={32} alt="Graphite3D Logo" />
                    </Link>
                    <div className="flex flex-col space-y-4">
                        <Link href="#" className="text-muted-foreground hover:text-foreground">Home</Link>
                        <Link href="#features" className="text-muted-foreground hover:text-foreground">Features</Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">How it works</Link>
                        <Link href="#" className="text-muted-foreground hover:text-foreground">Pricing</Link>
                    </div>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
  );
}
