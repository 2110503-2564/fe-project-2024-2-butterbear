type CardProps = {
  venueName: string;
  imgSrc: string;
  description?: string;
};

export default function Card({ venueName, imgSrc, description }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-[240px]">
      <div className="bg-gray-300 h-32 w-full">
        {/* <Image src={imgSrc} alt={venueName} fill className="object-cover" /> */}
      </div>
      <div className="p-4 text-left">
        <h3 className="text-md font-bold text-gray-800 mb-1">{venueName}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );
}
