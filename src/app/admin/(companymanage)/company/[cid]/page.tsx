"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function EditCompanyPage() {
  const { cid } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    address: "",
    district: "",
    province: "",
    postalcode: "",
    tel: "",
    website: "",
    region: "",
    salary: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUser();
  
  useEffect(() => {
    if (!user || user.role !== "admin") {
        router.push("/");
    }
  }, [user]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`https://two110503-backend-project-butterbear.onrender.com/api/v1/companies/${cid}`);
        const data = await res.json();
        if (res.ok && data.success) {
          const {
            name, description, location, address, district, province,
            postalcode, tel, website, region, salary, image
          } = data.data;
          setFormData({
            name, description, location, address, district,
            province, postalcode, tel, website, region, salary,
          });
          setExistingImage(image);
        } else {
          setError("Failed to load company");
        }
      } catch (err) {
        setError("Error fetching company");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [cid]);

  useEffect(() => {
    if (imageFile) handleImageUpload();
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
    try {
      const base64 = await fileToBase64(imageFile);
      setImageBase64(base64);
    } catch (err) {
      console.error(err);
      setError("Error converting image");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        ...formData,
        image: imageBase64 || existingImage,
      };

      const res = await fetch(`https://two110503-backend-project-butterbear.onrender.com/api/v1/companies/${cid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Company updated successfully");
        router.push("/admin/company");
      } else {
        const data = await res.json();
        alert("Update failed: " + data.message);
      }
    } catch (err) {
      alert("An error occurred while updating");
    }
  };

  if (loading) return <p className="text-center py-6">Loading company...</p>;
  if (error) return <p className="text-center text-red-600 py-6">{error}</p>;

  return (
    <main className="min-h-screen bg-[#f9f9f9] py-10 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl mx-auto px-8 py-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Company</h2>

        <div className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                {key}
              </label>
              <input
                name={key}
                value={value}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded text-sm"
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 mb-1">Upload New Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            {imageBase64 ? (
              <img src={imageBase64} alt="Preview" className="w-32 h-auto mt-2 rounded shadow" />
            ) : existingImage ? (
              <img
                src={`/image/company/${existingImage}`}
                alt="Current"
                className="w-32 h-auto mt-2 rounded shadow"
              />
            ) : null}
          </div>

          <div className="text-center mt-6">
            <button
              onClick={handleSave}
              className="bg-[#3B1F0B] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#5a2f14]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
