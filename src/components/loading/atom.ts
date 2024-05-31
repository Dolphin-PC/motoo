import { DefaultValue, atomFamily, selectorFamily } from "recoil";

export const loadingInfoState = atomFamily({
  key: "loadingInfoState",
  default: {
    loading: false,
    id: "",
    message: "",
  },
});

export const loadingState = selectorFamily({
  key: "loadingState",
  get:
    (id: string) =>
    ({ get }) => {
      const { loading } = get(loadingInfoState(id));

      return loading;
    },
  set:
    (id: string) =>
    ({ set }, newValue) => {
      set(loadingInfoState(id), (prevLoadingInfo) => ({
        ...prevLoadingInfo,
        loading: newValue as boolean,
      }));
    },
});
