type CardProps = {
  companyName: string;
  imgSrc: string;
  description?: string;
};

export default function Card({ companyName, imgSrc, description }: CardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-[240px]">
      <div className="bg-gray-300 h-32 w-full relative">
        <img
          src={imgSrc}
          alt={companyName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 text-left h-[100px]">
        <h3 className="text-md font-bold text-gray-800 mb-1">{companyName}</h3>
        <p className="text-sm text-gray-500 line-clamp-2 overflow-hidden text-ellipsis">
          {description}
        </p>
      </div>
    </div>
  );
}
