"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function ProfilePage() {
  const { user, setUser } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    tel: "",
    email: ""
  });

  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setFormData({
        name: user.name || "",
        tel: user.tel || "",
        email: user.email || ""
      });
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setStatusMessage(null);

    const res = await fetch("https://two110503-backend-project-butterbear.onrender.com/api/v1/auth/updatedetails", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (res.ok) {
      setUser(result.data);
      setIsError(false);
      setStatusMessage("Profile updated successfully!");
    } else {
      setIsError(true);
      if (result.msg === "Email is already in use by another account") {
        setStatusMessage("Email is already in use.");
      } else {
        setStatusMessage("Failed to update profile. Please try again.");
      }
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#3B1F0B] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full text-center">
        {/* Avatar */}
        <div className="flex justify-center -mt-20 mb-4">
          <div className="w-24 h-24 bg-gray-300 rounded-full border-4 border-white shadow-md">
            <img
              src="/image/default-avatar.png"
              alt="avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        {/* Name Title */}
        <h2 className="text-xl font-bold text-[#3B1F0B] mb-6">{formData.name}</h2>

        {/* Form */}
        <div className="space-y-3 text-left">
          <InputField label="Name" name="name" value={formData.name} onChange={handleChange} />
          <InputField label="Tel" name="tel" value={formData.tel} onChange={handleChange} />
          <InputField label="Email" name="email" value={formData.email} onChange={handleChange} />
        </div>

        {/* Status Message */}
        {statusMessage && (
          <div className={`mt-4 text-sm ${isError ? "text-red-600" : "text-green-600"}`}>
            {statusMessage}
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="mt-6 bg-[#BFAFA7] text-white font-semibold px-6 py-2 rounded hover:bg-[#a4948f] transition"
        >
          Save profile
        </button>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm"
      />
    </div>
  );
}
