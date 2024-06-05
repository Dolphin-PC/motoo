import { AmountStock } from "@/model/AmountStock";
import { TInquireTimeItemChartPriceRes } from "@/service/openapi/biz/inquireTimeItemChartPrice";
import { atom, selector } from "recoil";

/** 분봉 데이터 */
export const inquireDataState = atom<TInquireTimeItemChartPriceRes | null>({
  key: "inquireDataState",
  default: null,
});

export const currentPriceState = selector<number>({
  key: "currentPriceState",
  get: ({ get }) => {
    const inquireData = get(inquireDataState);
    if (inquireData == null) return 0;

    return Number(inquireData.output1.stck_prpr);
  },
});

export const stockIdState = atom<string | null>({
  key: "stockIdState",
  default: null,
});

export const amountStockState = atom<null | AmountStock>({
  key: "amountStockState",
  default: null,
});

export const stockPriceState = atom({
  key: "stockPriceState",
  default: {
    init: false,
    maxPrice: Infinity,
    minPrice: 0,
  },
});
