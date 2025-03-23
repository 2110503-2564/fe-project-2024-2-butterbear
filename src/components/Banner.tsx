"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Banner() {
  const covers = [
    "/image/banner.png"
  ];
  const [index, setIndex] = useState(0);
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div
      className="relative w-screen h-[50vh]"
      onClick={() => {
        setIndex((prev) => (prev + 1) % covers.length);
      }}
    >
      {/* Background image */}
      <Image
        src={covers[index % covers.length]}
        alt="cover"
        fill
        priority
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Centered Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
          Your career journey starts here
        </h1>
        <p className="mt-4 text-white text-base md:text-lg drop-shadow-lg max-w-2xl">
          Join the Online Job Fair 2022 and meet your future employer. <br />
          Booking interviews with leading companies has never been this easy.
        </p>
      </div>
    </div>
  );
}
