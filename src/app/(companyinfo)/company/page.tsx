"use client";
import Card from "@/components/Card";

export default function CompanyAll() {
  const companies = [
    {
      cid: "001",
      name: "TechNova Solutions",
      image: "/image/company1.jpg",
      description: "Digital transformation & IT consulting firm.",
    },
    {
      cid: "002",
      name: "GreenLeaf Technologies",
      image: "/image/company2.jpg",
      description: "Renewable energy & sustainability solutions provider.",
    },
    {
      cid: "003",
      name: "UrbanEdge Consulting",
      image: "/image/company3.jpg",
      description: "Urban development & architecture consulting firm.",
    },
    {
      cid: "004",
      name: "Blue Horizon Financial",
      image: "/image/company4.jpg",
      description: "Financial advisory & investment management experts.",
    },
    {
      cid: "005",
      name: "Innovative Ventures",
      image: "/image/company5.jpg",
      description: "Venture capital firm investing in tech startups.",
    },
    {
      cid: "006",
      name: "Krungthai",
      image: "/image/grandtable.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ...",
    },
  ];

  return (
    <div className="bg-white text-center py-12 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Our company</h2>
      <p className="text-gray-600 mb-10">
        Connect with 300+ top companies. One platform. Endless opportunities.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {companies.map((company) => (
          <Card
            key={company.cid}
            venueName={company.name}
            imgSrc={company.image}
            description={company.description}
          />
        ))}
      </div>
    </div>
  );
}
