"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@/context/UserContext";

export default function TopMenu() {
  const { user, setUser } = useUser();
  const role = user?.role;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  const renderMenu = () => {
    if (!role) {
      return (
        <div className="flex items-center space-x-6">
          <Link href="/company" className="font-medium text-[#3B1F0B] transition duration-300 transform hover:scale-105">
            Booking Interview
          </Link>
          <Link href="/login" className="font-medium text-[#3B1F0B] transition duration-300 transform hover:scale-105">
            Log In
          </Link>
          <Link href="/signup" className="font-medium text-[#3B1F0B] transition duration-300 transform hover:scale-105">
            Sign Up
          </Link>
        </div>
      );
    }

    if (role === "user") {
      return (
        <div className="flex items-center space-x-6">
          <Link href="/mybooking" className="font-medium text-[#3B1F0B] transition duration-300 transform hover:scale-105">
            My Booking
          </Link>
          <button onClick={handleLogout} className="font-medium text-[#3B1F0B] transition duration-300 transform hover:scale-105">
            Log Out
          </button>
          <Link href="/profile" className="font-medium text-[#3B1F0B] transition duration-300 transform hover:scale-105">
            <Image src="/image/default-avatar.png" alt="Profile" width={30} height={30} className="inline rounded-full mr-1" />
          </Link>
        </div>
      );
    }

    if (role === "admin") {
      return (
        <div className="flex items-center space-x-6">
          <button onClick={handleLogout} className="font-medium text-[#3B1F0B] transition duration-300 transform hover:scale-105">
            Log Out
          </button>
          <Link href="/profile" className="font-medium text-[#3B1F0B] transition duration-300 transform hover:scale-105">
            <Image src="/image/default-avatar.png" alt="Admin" width={30} height={30} className="inline rounded-full mr-1" />
          </Link>
        </div>
      );
    }
  };

  const logoLink = role === "admin" ? "/admin" : "/";

  return (
    <div className="flex items-center justify-between bg-[#FFDEB4] px-6 py-4 shadow-md">
      <Link href={logoLink} className="text-xl font-bold italic text-[#3B1F0B]">
        Butterbear.co
      </Link>
      {renderMenu()}
    </div>
  );
}
