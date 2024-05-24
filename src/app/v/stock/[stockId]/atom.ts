import { TInquireTimeItemChartPriceRes } from "@/pages/service/openapi/OpenApiService";
import { atom, selector } from "recoil";

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
