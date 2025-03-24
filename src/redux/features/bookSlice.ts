import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookState = {
  bookItems: BookingItem[];
};

const initialState: BookState = { bookItems: [] };

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    addBooking: (state, action: PayloadAction<BookingItem>) => {
      const existingIndex = state.bookItems.findIndex(
        (item) =>
          item.companyId === action.payload.companyId &&
          item.bookDate === action.payload.bookDate &&
          item.userId === action.payload.userId
      );

      if (existingIndex !== -1) {
        // ถ้าเคยจองวันเดียวกันกับบริษัทนี้ → อัปเดตแทน
        state.bookItems[existingIndex] = action.payload;
      } else {
        state.bookItems.push(action.payload);
      }
    },

    removeBooking: (state, action: PayloadAction<BookingItem>) => {
      state.bookItems = state.bookItems.filter(
        (item) =>
          !(
            item.name === action.payload.name &&
            item.tel === action.payload.tel &&
            item.email === action.payload.email &&
            item.bookDate === action.payload.bookDate &&
            item.companyId === action.payload.companyId &&
            item.userId === action.payload.userId
          )
      );
    },
  },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;