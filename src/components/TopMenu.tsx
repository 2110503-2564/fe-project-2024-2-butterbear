"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function TopMenu() {
  const { data: session } = useSession();

  // Determine home path based on user role
  let homePath = "/home-anonymous";
  if (session?.user?.role === "admin") homePath = "/admin";
  else if (session?.user?.role === "user") homePath = "/home-user";

  return (
    <div className="relative flex items-center justify-between bg-[#FFDEB4] px-6 py-4 shadow-md">
      {/* Left: Avatar + Logo */}
      <div className="flex items-center space-x-3 z-10">
        {session?.user && (
          <Image
            src={"/image/default-avatar.png"} // replace with session.user.image if you store one
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <Link href={homePath}>
          <div className="text-2xl font-bold italic text-[#3B1F0B] cursor-pointer">
            Butterbear.co
          </div>
        </Link>
      </div>

      {/* Center: Booking Interview */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <Link href="/companyall">
          <button className="bg-[#3B1F0B] hover:bg-[#5a2f14] text-white px-6 py-2 rounded-md font-medium">
            Booking Interview
          </button>
        </Link>
      </div>

      {/* Right: Auth buttons */}
      <div className="flex items-center space-x-4 z-10">
        {session ? (
          <button
            onClick={() => signOut()}
            className="text-[#3B1F0B] font-medium"
          >
            Log Out
          </button>
        ) : (
          <>
            <Link href="/login">
              <button className="text-[#3B1F0B] font-medium">Log In</button>
            </Link>
            <Link href="/signup">
              <button className="bg-[#3B1F0B] text-white px-4 py-2 rounded-md font-semibold">
                Sign Up
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
