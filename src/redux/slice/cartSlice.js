/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
import { createSlice } from "@reduxjs/toolkit";
import api from "../../config/axiosConfig";
import { message } from "antd";


const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const token = localStorage.getItem("token");
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: calculateTotal(storedCartItems),
    isSidebarOpen: false,
  },
  reducers: {
    setFetchedData: (state, action) => {
      if (token) {
        state.items = action.payload;
      } else {
        state.items = storedCartItems;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;

      localStorage.removeItem("cartItems");
    },
    addToCartLocally: (state, action) => {
      state.items.push(action.payload);
      if (token) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      }
      state.total = calculateTotal(state.items);
      if (!token)
        localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    //-----------------------------------add to cart-------------------------------

    addToCart(state, action) {
      const check = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (check !== -1) {
        state.items[check].quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      state.total = calculateTotal(state.items);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    //---------------------------------update quantity-----------------------------

    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);

      if (item) {
        if (item.quantity + quantity >= 0) {
          item.quantity += quantity;
          state.total = calculateTotal(state.items);
        }
      }

      if (token) {
        updateBasket(item.basketId, item.quantity);
      } else localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    //---------------------------------remove--------------------------------------

    removeItem(state, action) {
      if (token) {
        deleteBasket(action.payload.item.basketId);
      } else {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.item.id
        );
        state.total = calculateTotal(state.items);
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      }
    },

    //-----------------------------------open---------------------------------------
    openCartSidebar(state) {
      state.isSidebarOpen = true;
    },
    //----------------------------------close---------------------------------------
    closeCartSidebar(state) {
      state.isSidebarOpen = false;
    },
    addToBasket(id, item) {
      addBasket(id, item.quantity);
    },
  },
});

const addBasket = async (id, count) => {
  try {
    await api
      .post("/site/basket", {
        basket: [
          {
            productId: id,
            productCount: count,
          },
        ],
      })
      .then(() => {
        message.success("added to basket");
      });
  } catch (error) {
    if (error.response && error.response.status === 400) {
      updateBasket(id, count).then(() => {
        message.success("updated basket");
      });
    }
    console.error("Error creating product:", error.message);
  }
};

const updateBasket = async (id, count) => {
  try {
    await api.put(`/site/basket/${id}`, {
      productCount: count,
    });
  } catch (error) {
    console.error("Error creating product:", error.message);
  }
};


const deleteBasket = async (id) => {
  try {
    await api.delete(`/site/basket/${id}`);
    window.location.reload();
  } catch (error) {
    console.error("Error creating product:", error.message);
  }
};

const { actions, reducer } = cartSlice;

export const {
  clearCart,
  addToCart,
  updateQuantity,
  removeItem,
  openCartSidebar,
  closeCartSidebar,
  addToBasket,
  addToCartLocally,
  setFetchedData,
} = actions;

export default reducer;
