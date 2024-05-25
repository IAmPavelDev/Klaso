import { create } from "zustand";
import { UserSlice, UserSliceType } from "./user";
import { AssideSlice, AssideSliceType } from "./asside";

export const useStore = create<UserSliceType & AssideSliceType>()((...a) => ({
  ...UserSlice(...a),
  ...AssideSlice(...a),
}));
