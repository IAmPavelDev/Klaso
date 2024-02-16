import { create } from "zustand";
import { UserSlice, UserSliceType } from "./user";

export const useStore = create<UserSliceType>()((...a) => ({
  ...UserSlice(...a),
}));
