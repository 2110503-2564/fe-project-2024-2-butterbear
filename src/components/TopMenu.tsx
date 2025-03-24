"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function TopMenu() {
  const { data: session } = useSession();
  const role = session?.user?.role;

  const renderMenu = () => {
    if (!role) {
      // Anonymous Top Menu
      return (
        <div className="flex items-center space-x-4">
          <Link href="/companyinfo/company" className="font-medium text-[#3B1F0B] hover:underline">
            Booking Interview
          </Link>
          <Link href="/login" className="font-medium text-[#3B1F0B] hover:underline">
            Log In
          </Link>
          <Link href="/signup" className="font-medium text-[#3B1F0B] hover:underline">
            Sign Up
          </Link>
        </div>
      );
    }

    if (role === "user") {
      // User Top Menu
      return (
        <div className="flex items-center space-x-4">
          <Link href="/mybooking" className="font-medium text-[#3B1F0B] hover:underline">
            My Booking
          </Link>
          <Link href="/profile" className="font-medium text-[#3B1F0B] hover:underline">
            <Image src="/image/default-avatar.png" alt="Profile" width={28} height={28} className="inline rounded-full mr-1" />
            Profile
          </Link>
          <button onClick={() => signOut()} className="font-medium text-[#3B1F0B] hover:underline">
            Log Out
          </button>
        </div>
      );
    }

    if (role === "admin") {
      // Admin Top Menu
      return (
        <div className="flex items-center space-x-4">
          <Link href="/profile" className="font-medium text-[#3B1F0B] hover:underline">
            <Image src="/image/default-avatar.png" alt="Admin" width={28} height={28} className="inline rounded-full mr-1" />
            Profile
          </Link>
          <button onClick={() => signOut()} className="font-medium text-[#3B1F0B] hover:underline">
            Log Out
          </button>
        </div>
      );
    }
  };

  const logoLink = role === "admin" ? "/admin" : "/";

  return (
    <div className="flex items-center justify-between bg-[#FFDEB4] px-6 py-4 shadow-md">
      {/* Logo (Left) */}
      <Link href={logoLink} className="text-2xl font-bold italic text-[#3B1F0B]">
        JobFair
      </Link>

      {/* Menu (Center & Right) */}
      {renderMenu()}
    </div>
  );
}