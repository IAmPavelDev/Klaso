import { StateCreator } from "zustand";

export type AssideSliceType = {
  isLeftAssideFoldable: boolean;
  leftAssideState: boolean;
  switchLeftAssideState: () => void;
  setLeftAssideState: (data: boolean) => void;
  setIsLeftAssideFoldable: (data: boolean) => void;
};

export const AssideSlice: StateCreator<
  AssideSliceType,
  [],
  [],
  AssideSliceType
> = (set) => ({
  leftAssideState: false,
  isLeftAssideFoldable: false,
  switchLeftAssideState: () =>
    set((Store) => ({ ...Store, leftAssideState: !Store.leftAssideState })),
  setLeftAssideState: (data) =>
    set((Store) => ({ ...Store, leftAssideState: data })),
  setIsLeftAssideFoldable: (data) =>
    set((Store) => ({ ...Store, isLeftAssideFoldable: data })),
});
