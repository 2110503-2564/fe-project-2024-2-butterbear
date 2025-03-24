"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function InteractiveCard({
  children,
  contentName,
  cid,
}: {
  children: React.ReactNode;
  contentName: string;
  cid: string;
}) {
  const router = useRouter();

  function onCardMouseAction(event: React.SyntheticEvent) {
    if (event.type == "mouseover") {
      event.currentTarget.classList.remove("shadow-lg", "bg-white");
      event.currentTarget.classList.add("shadow-2xl", "bg-neutral-200", "cursor-pointer");
    } else {
      event.currentTarget.classList.remove("shadow-2xl", "bg-neutral-200", "cursor-pointer");
      event.currentTarget.classList.add("shadow-lg", "bg-white");
    }
  }

  function handleClick() {
    router.push(`/companyinfo/company/${cid}`);
  }

  return (
    <div
      className="rounded-lg shadow-lg bg-white transition duration-200 inline-block"
      onMouseOver={onCardMouseAction}
      onMouseOut={onCardMouseAction}
      onClick={handleClick}
    >
      {children}
    </div>
  );
}