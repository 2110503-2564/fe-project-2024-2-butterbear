"use client";
import { removeBooking } from "@/redux/features/bookSlice";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";

export default function BookingList() {
  const bookItems = useAppSelector((state) => state.bookSlice.bookItems);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      {bookItems.length == 0
        ? "No Venue Booking"
        : bookItems.map((bookItems) => (
            <div
              className="bg-slate-200 rounded px-5 mx-5 py-2 my-2"
              key={bookItems.nameLastname}
            >
              <div className="texl-xl">{bookItems.venue}</div>
              <div className="text-sm">
                Name-Lastname {bookItems.nameLastname}
              </div>
              <div className="text-sm">Tel {bookItems.tel}</div>
              <div className="text-sm">Date {bookItems.bookDate}</div>
              <button
                className="block rounded-md bg-sky-600 hover:bg-indigo-600
                    px-3 py-1 text-white shadow-sm"
                onClick={() => dispatch(removeBooking(bookItems))}
              >
                Remove Booking
              </button>
            </div>
          ))}
    </>
  );
}
