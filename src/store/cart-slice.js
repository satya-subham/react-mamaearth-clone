import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  name: "",
  email: "",
  msg: "",
};
export const fetchCart = createAsyncThunk("cart/fetchCart", async () => {
  const response = await axios
    .get("https://mamarath-backend.vercel.app/api/v1/users/loggedInUser", {
      withCredentials: true,
    });

    return response.data;

});
export const removeProductFromCart = createAsyncThunk("cart/removeProductFromCart", async (body) => {
    console.log("remove product from cart step 2")
    const res = await fetch(
        `https://mamarath-backend.vercel.app/api/v1/users/cart/${body.email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
    return res.json();    
});
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item._id === newItem._id
      );

      if (!existingItem) {
        state.cartItems.push(newItem);
        state.totalQuantity++;
        state.totalAmount += newItem.price * newItem.quantity;
      } else {
        existingItem.quantity += newItem.quantity;
        state.totalAmount += newItem.price * newItem.quantity;
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item._id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item._id !== id);
        state.totalQuantity--;
        state.totalAmount -= existingItem.price * existingItem.quantity;
      }
    },
    clearCart(state) {
      state.cartItems = null;
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.cartItems = (action.payload.cart || []);
      state.totalQuantity = (action.payload.cart.length || 0);
      state.totalAmount = action.payload.cart.reduce(
        (total, item) => total + item.price,
        0
      );
      state.name = action.payload.firstName;
      state.email = action.payload.email;
    });

    builder.addCase(removeProductFromCart.fulfilled, (state, action) => {
      console.log("remove product from cart step 3")
      state.msg = "Product removed from cart successfully";
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload.id
      );
      state.totalQuantity--;
      state.totalAmount -= action.payload.price * action.payload.quantity;
    });
  },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
