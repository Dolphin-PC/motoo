import { DefaultValue, atom, selectorFamily } from "recoil";

export const tabOpenStateList = atom<boolean[]>({
  key: "tabOpenStateList",
  default: [],
});

// export const tabOpenStateList = atomFamily<>({
//   key: "tabOpenStateList",
//   default: [],
// });

export const tabOpenState = selectorFamily({
  key: "tabOpenState",
  get:
    (tabIndex: number) =>
    ({ get }) => {
      return get(tabOpenStateList)[tabIndex];
    },
  set:
    (tabIndex: number) =>
    ({ set }, newValue: boolean | DefaultValue) => {
      set(tabOpenStateList, (prev) => {
        const newState = [...prev];
        if (!(newValue instanceof DefaultValue)) {
          newState[tabIndex] = newValue;
        }
        return newState;
      });
    },
});

// export const setTabState = selectorFamily({
//   key: "setTabState",
//   set:
//     (tabIndex: number) =>
//     ({ get, set }, newValue: boolean) => {
//       const tabList = get(tabOpenStateList);
//       tabList[tabIndex] = newValue;
//       set(tabOpenStateList, tabList);
//     },
// });
