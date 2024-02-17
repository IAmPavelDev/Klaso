import { StudentOmitPwd } from "@/types/Student";
import { StateCreator } from "zustand";

export type UserSliceType = {
  isUserLoaded: boolean;
  state: StudentOmitPwd;
  setState: (data: StudentOmitPwd) => void;
  clearState: () => void;
};

export const UserSlice: StateCreator<UserSliceType, [], [], UserSliceType> = (
  set
) => ({
  isUserLoaded: false,
  state: {} as StudentOmitPwd,
  setState: (data: StudentOmitPwd) =>
    set((Store) => ({ ...Store, state: data, isUserLoaded: true })),
  clearState: () => {
    set((Store) => {
      return {
        ...Store,
        state: {} as StudentOmitPwd,
        isUserLoaded: false,
      } as UserSliceType;
    });
  },
});
