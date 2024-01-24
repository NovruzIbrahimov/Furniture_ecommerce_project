import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [], total: 0, isSidebarOpen: false },
  reducers: {
    clearCart: state => {
      state.items = [];
    },
    addToCart(state, action) {
      const check = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (check !== -1) {
        state.items[check].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.total = state.items.reduce(
        (sum, item) => sum + +item?.price * item?.quantity,
        0
      );
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (item.quantity + quantity >= 0) {
          item.quantity += quantity;
          state.total = state.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );
        }
      }
    },

    removeItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.total = state.items.reduce(
        (sum, item) => sum + +item?.price * item?.quantity,
        0
      );
    },
    openCartSidebar(state) {
      state.isSidebarOpen = true;
    },
    closeCartSidebar(state) {
      state.isSidebarOpen = false;
    },
  },
});

const { actions, reducer } = cartSlice;

export const {
  clearCart,
  addToCart,
  updateQuantity,
  removeItem,
  openCartSidebar,
  closeCartSidebar,
} = actions;

export default reducer;





// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// export const fetchCartItems = createAsyncThunk(
//   "cart/fetchCartItems",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(
//         "https://frontend-api-dypw.onrender.com/api/f8ea5b03-9ce6-49c7-8c93-2408a7fa9edb/site/basket",
//         {
//           headers: {
//             Authorization: localStorage.getItem("token"),
//           },
//         }
//       );
//       return response.data.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     items: [],
//     total: 0,
//     isSidebarOpen: false,
//     status: "idle",
//     error: null,
//   },
//   reducers: {
//     addToCart(state, action) {
//       const check = state.items.findIndex(
//         (item) => item._id === action.payload._id
//       );
//       if (check !== -1) {
//         state.items[check].productCount += action.payload.productCount;
//       } else {
//         state.items.push(action.payload);
//       }

//       state.total = state.items.reduce(
//         (sum, item) => sum + +item?.productPrice * item?.productCount,
//         0
//       );
//     },
//     updateQuantity(state, action) {
//       const { _id, productCount } = action.payload;
//       const item = state.items.find((item) => item._id === _id);

//       if (item) {
//         if (item.productCount + productCount >= 0) {
//           item.productCount += productCount;
//           state.total = state.items.reduce(
//             (sum, item) => sum + item.productPrice * item.productCount,
//             0
//           );
//         }
//       }
//     },
//     removeItem(state, action) {
//       state.items = state.items.filter(
//         (item) => item._id !== action.payload._id
//       );
//       state.total = state.items.reduce(
//         (sum, item) => sum + +item?.productPrice * item?.productCount,
//         0
//       );
//     },
//     openCartSidebar(state) {
//       state.isSidebarOpen = true;
//     },
//     closeCartSidebar(state) {
//       state.isSidebarOpen = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCartItems.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchCartItems.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(fetchCartItems.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

// const { actions, reducer } = cartSlice;

// export const {
//   addToCart,
//   updateQuantity,
//   removeItem,
//   openCartSidebar,
//   closeCartSidebar,
// } = actions;

// export default reducer;
