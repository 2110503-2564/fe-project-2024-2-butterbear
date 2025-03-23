"use client";
import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Select, MenuItem, TextField } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";

export default function DateReserve({ onChange }: { onChange: Function }) {
  const [nameLastname, setNameLastname] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    onChange({
      nameLastname,
      tel: contactNumber,
      venue,
      bookDate: date ? date.format("YYYY-MM-DD") : "",
    });
  }, [nameLastname, contactNumber, venue, date]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameLastname(event.target.value);
  };

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContactNumber(event.target.value);
  };

  const handleVenueChange = (event: any) => {
    setVenue(event.target.value);
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    setDate(newDate);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 w-fit flex flex-col space-y-6">
      <div className="space-y-4">
        <div className="sm:col-span-3">
          <label
            htmlFor="Name-Lastname"
            className="block text-lg font-medium text-gray-700"
          >
            Name-Lastname
          </label>
          <div className="mt-2">
            <input
              type="text"
              id="Name-Lastname"
              name="Name-Lastname"
              value={nameLastname}
              onChange={handleNameChange}
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="Contact-Number"
            className="block text-lg font-medium text-gray-700"
          >
            Contact-Number
          </label>
          <div className="mt-2">
            <input
              id="Contact-Number"
              name="Contact-Number"
              type="text"
              value={contactNumber}
              onChange={handleContactChange}
              placeholder="Your Contact Number"
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="Pick-Venue"
            className="block text-lg font-medium text-gray-700"
          >
            Pick Venue
          </label>
          <Select
            variant="standard"
            name="venue"
            id="venue"
            value={venue}
            onChange={handleVenueChange}
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
          >
            <MenuItem value="Bloom">The Bloom Pavilion</MenuItem>
            <MenuItem value="Spark">Spark Space</MenuItem>
            <MenuItem value="GrandTable">The Grand Table</MenuItem>
          </Select>
        </div>

        <div className="sm:col-span-3">
          <label
            htmlFor="Pick-Date"
            className="block text-lg font-medium text-gray-700"
          >
            Pick Date
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-gray-900"
              value={date}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
}
