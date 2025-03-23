import CardPanel from "@/components/CardPanel";
import VenueCatalog from "@/components/VenueCatalog";
import getVenues from "@/libs/getVenues";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";

export default function Car() {
  const venue = getVenues();

  return (
    <main className="text-center p-5">
      <h1 className="text-xl font-medium text-black">Select Your Event</h1>
      <Suspense
        fallback={
          <p className="text-black">
            Loading... <LinearProgress />
          </p>
        }
      >
        <VenueCatalog venuesJson={venue} />
      </Suspense>
    </main>
  );
}
