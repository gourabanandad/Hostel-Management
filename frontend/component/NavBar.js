"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  SignInButton,
  SignUpButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { isAdminEmail } from "@/utils/isAdmin";

function NavBar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (isLoaded && user?.primaryEmailAddress?.emailAddress) {
      const email = user.primaryEmailAddress.emailAddress;
      if (isAdminEmail(email)) {
        setIsAdmin(true);
        // Redirect only from specific starting pages
        if (pathname === "/" || pathname === "/sign-in" || pathname === "/sign-up") {
          router.push("/admin");
        }
      }
    }
  }, [isLoaded, user, router, pathname]);

  return (
    <header className="bg-blue-50 border-b border-blue-100">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow">
              H
            </span>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              HostelHub
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`px-1 py-2 font-medium transition-colors ${
                pathname === "/" ? "text-blue-600 border-b-2 border-blue-500" : "text-blue-800 hover:text-blue-600"
              }`}
            >
              Home
            </Link>
            <Link
              href="/hosteller/mealVoting"
              className={`px-1 py-2 font-medium transition-colors ${
                pathname.startsWith("/hosteller/mealVoting")
                  ? "text-blue-600 border-b-2 border-blue-500"
                  : "text-blue-800 hover:text-blue-600"
              }`}
            >
              Meal Voting
            </Link>
            <Link
              href="/hosteller/complains"
              className={`px-1 py-2 font-medium transition-colors ${
                pathname.startsWith("/hosteller/complains")
                  ? "text-blue-600 border-b-2 border-blue-500"
                  : "text-blue-800 hover:text-blue-600"
              }`}
            >
              Complaints
            </Link>
            {isAdmin && (
              <Link
                href="/admin"
                className={`px-1 py-2 font-medium transition-colors ${
                  pathname === "/admin" ? "text-blue-600 border-b-2 border-blue-500" : "text-blue-800 hover:text-blue-600"
                }`}
              >
                Admin Panel
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton afterSignInUrl="/">
                <button className="px-4 py-2 rounded-lg font-medium text-blue-800 hover:bg-blue-100 transition-colors">
                  Log In
                </button>
              </SignInButton>
              <Link href={"/Register"}>
              
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-colors shadow-md hover:shadow-lg">
                  Join Us
                </button>
                </Link>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center space-x-4">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 border-2 border-blue-200",
                      userButtonPopoverCard: "shadow-xl border border-blue-100",
                    },
                  }}
                />
                <SignOutButton>
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800 rounded-lg font-medium hover:bg-blue-200 transition-colors border border-blue-200">
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
            </SignedIn>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default NavBar;