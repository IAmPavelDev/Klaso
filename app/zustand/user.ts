import { StudentOmitPwd } from "@/types/Student";
import { StateCreator } from "zustand";

export type UserSliceType = {
  state: StudentOmitPwd;
  setState: (data: StudentOmitPwd) => void;
};

export const UserSlice: StateCreator<UserSliceType, [], [], UserSliceType> = (
  set
) => ({
  state: {} as StudentOmitPwd,
  setState: (data: StudentOmitPwd) =>
    set((state) => ({ ...state, state: data })),
});
