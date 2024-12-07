import { INCREMENT, DECREMENT } from "./types";

export const increaseCounter = () => {
  return {
    type: INCREMENT,
    payload: { like: "VuiNguyen", name: "Hue" },
  };
};

export const decreaseCounter = () => {
  return {
    type: DECREMENT,
    payload: { like: "VuiNguyen", name: "Hue" },
  };
};
