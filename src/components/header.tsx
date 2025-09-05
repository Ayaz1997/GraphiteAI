
import Link from 'next/link';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from './ui/sheet';
import { Menu, X, User } from 'lucide-react';
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
            <Button className="rounded-full hidden md:inline-flex" variant="outline" size="sm" asChild>
                <Link href="#">
                    <User className="mr-2 h-4 w-4" />
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
                <SheetContent side="top" className="bg-white shadow-lg rounded-[32px] p-4 pt-0 m-4 border-0">
                    <div className="flex flex-col">
                        <div className="p-4 pt-10 flex items-center justify-between rounded-t-lg">
                            <Link href="/" className="flex items-center gap-2">
                                <Image src="/images/logo.png" width={120} height={32} alt="Graphite3D Logo" />
                            </Link>
                            <SheetClose asChild>
                                <Button variant="ghost" size="icon">
                                    <X className="h-5 w-5" />
                                    <span className="sr-only">Close</span>
                                </Button>
                            </SheetClose>
                        </div>
                        <div className="bg-white p-4">
                            <div className="flex flex-col space-y-4 text-lg font-medium">
                                <SheetClose asChild>
                                    <Link href="#" className="text-gray-800 hover:text-primary">Home</Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href="#features" className="text-gray-800 hover:text-primary">Features</Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href="#" className="text-gray-800 hover:text-primary">How it works</Link>
                                </SheetClose>
                                <SheetClose asChild>
                                    <Link href="#" className="text-gray-800 hover:text-primary">Pricing</Link>
                                </SheetClose>
                            </div>
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <SheetClose asChild>
                                     <Button className="w-full rounded-full" variant="outline" size="lg" asChild>
                                        <Link href="#">
                                            <User className="mr-2 h-4 w-4" />
                                            Sign in
                                        </Link>
                                    </Button>
                                </SheetClose>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
  );
}
