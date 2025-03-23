import Image from "next/image";
import getVenue from "@/libs/getVenue";

export default async function CardDetailPage({
  params,
}: {
  params: { vid: string };
}) {
  const venueDetail = await getVenue(params.vid);
  return (
    <main>
      <h1 className="text-large font-medium text-black content-center ">
        <div className="flex flex-row my-5">
          <Image
            src={venueDetail.data.picture}
            alt="Card Image"
            width={0}
            height={0}
            sizes="100vw"
            className="rounded-lg w-[30%]"
          ></Image>
          <div>
            <div className="text-md mx-5">{venueDetail.data.name}</div>
            <div className="text-md mx-5">{venueDetail.data.address}</div>
            <div className="text-md mx-5">{venueDetail.data.district}</div>
            <div className="text-md mx-5">{venueDetail.data.province}</div>
            <div className="text-md mx-5">{venueDetail.data.postalcode}</div>
            <div className="text-md mx-5">{venueDetail.data.tel}</div>
          </div>
        </div>
      </h1>
    </main>
  );
}
