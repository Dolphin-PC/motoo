import { DefaultValue, atom, selector } from "recoil";
import { TBuySell } from "./OrderForm";

export const orderState = atom<TBuySell>({
  key: "orderState",
  default: {
    price: 0,
    quantity: 0,
  },
});

export const orderPriceState = selector<number>({
  key: "orderPriceState",
  get: ({ get }) => {
    const { price } = get(orderState);
    return price;
  },
  set: ({ set }, newValue: number | DefaultValue) => {
    if (newValue instanceof DefaultValue) return;
    set(orderState, (prev: TBuySell) => ({ ...prev, price: newValue }));
  },
});

export const orderQuantityState = selector<number>({
  key: "orderQuantityState",
  get: ({ get }) => {
    const { quantity } = get(orderState);
    return quantity;
  },
  set: ({ set }, newValue: number | DefaultValue) => {
    if (newValue instanceof DefaultValue) return;
    set(orderState, (prev: TBuySell) => ({ ...prev, quantity: newValue }));
  },
});
