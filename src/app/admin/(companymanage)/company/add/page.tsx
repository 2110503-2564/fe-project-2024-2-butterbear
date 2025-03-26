"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function AddCompanyPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [postalcode, setPostalCode] = useState("");
  const [tel, setTelephone] = useState("");
  const [region, setRegion] = useState("");
  const [salary, setSalary] = useState("");
  const [website, setWebsite] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFilename, setImageFilename] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const { user } = useUser();
    
  useEffect(() => {
    if (!user || user.role !== "admin") {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    handleImageUpload()
  }, [imageFile]);

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });

  const handleImageUpload = async () => {
    if (!imageFile) return;
    console.log("yayay2")
    try {
      const base64 = await fileToBase64(imageFile);
      setImageBase64(base64); // ⬅ เก็บไว้ใน state
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error converting image");
    }
  };
    

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(imageBase64)
    if (
      !name || !description || !location || !address || !district || !province ||
      !postalcode || !tel || !region || !salary || !website || !imageBase64
    ) {
      setError("All fields are required");
      return;
    }

    const token = localStorage.getItem("token");
    
    try {
      const res = await fetch("https://2110503-backend-project-sable.vercel.app//api/v1/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name, description, location, address, district, province,
          postalcode, tel, region, salary, website, image: imageBase64,
        }),
      });

      if (!res.ok) throw new Error("Failed to add company");
      router.push("/admin/company");
    } catch (err) {
      console.error(err);
      setError("Error adding company");
    }
  };

  if (!isClient) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f9f9f9] p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Company</h1>
      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <TextInput label="Company Name" value={name} setValue={setName} id="name" />
        <TextInput label="Description" value={description} setValue={setDescription} id="description" />
        <TextInput label="Location (Google Map URL)" value={location} setValue={setLocation} id="location" />
        <TextInput label="Address" value={address} setValue={setAddress} id="address" />
        <TextInput label="District" value={district} setValue={setDistrict} id="district" />
        <TextInput label="Province" value={province} setValue={setProvince} id="province" />
        <TextInput label="Postal Code" value={postalcode} setValue={setPostalCode} id="postalCode" />
        <TextInput label="Telephone" value={tel} setValue={setTelephone} id="telephone" />
        <TextInput label="Region" value={region} setValue={setRegion} id="region" />
        <TextInput label="Salary" value={salary} setValue={setSalary} id="salary" />
        <TextInput label="Website" value={website} setValue={setWebsite} id="website" />

        <div>
          <label className="block text-gray-700" htmlFor="image">Upload Image</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          {imageFilename && (
            <p className="text-green-600 mt-1">Uploaded: {imageFilename}</p>
          )}
          {imageBase64 && (
            <img src={imageBase64} alt="Preview" className="w-32 h-auto mt-2 rounded shadow" />
          )}

        </div>

        <button
          type="submit"
          className="bg-[#3B1F0B] text-white px-6 py-2 rounded-md hover:bg-[#5a2f14]"
        >
          Add Company
        </button>
      </form>
    </div>
  );
}

function TextInput({ label, value, setValue, id }: { label: string; value: string; setValue: (v: string) => void; id: string }) {
  return (
    <div>
      <label className="block text-gray-700" htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
        required
      />
    </div>
  );
}