import { StudentOmitPwd } from "@/types/Student";
import { TeacherOmitPwd } from "@/types/Teacher";
import { StateCreator } from "zustand";

export type UserSliceType = {
  isUserLoaded: boolean;
  userType: "" | "student" | "teacher";
  state: StudentOmitPwd | TeacherOmitPwd;
  setState: (
    data: StudentOmitPwd | TeacherOmitPwd,
    userType: "student" | "teacher"
  ) => void;
  clearState: () => void;
};

export const UserSlice: StateCreator<UserSliceType, [], [], UserSliceType> = (
  set
) => ({
  isUserLoaded: false,
  userType: "",
  state: {} as StudentOmitPwd | TeacherOmitPwd,
  setState: (data, userType) =>
    set((Store) => ({ ...Store, state: data, isUserLoaded: true, userType })),
  clearState: () => {
    set((Store) => {
      return {
        ...Store,
        state: {} as StudentOmitPwd | TeacherOmitPwd,
        isUserLoaded: false,
        userType: "",
      } as UserSliceType;
    });
  },
});
