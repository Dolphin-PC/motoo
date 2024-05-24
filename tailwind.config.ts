import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      gray: colors.gray,
      primary: {
        "100": "#f5f1fe",
        "150": "#e4d9fc",
        "200": "#d3c1fa",
        "250": "#c2a9f7",
        "300": "#b191f5",
        "350": "#9f79f3",
        "400": "#8e61f1",
        "450": "#7d49ef",
        "500": "#6d31ed",
        "550": "#5b18eb",
        "600": "#5113d7",
        "650": "#4811bf",
        "700": "#3f0ea6",
        "750": "#360c8e",
        "800": "#2d0a76",
        "850": "#23085e",
        "900": "#1a0646",
        DEFAULT: "#6d31ed",
      },
      secondary: {
        "100": "#f0f9ff",
        "150": "#d4efff",
        "200": "#b9e5ff",
        "250": "#9ddbff",
        "300": "#82d1ff",
        "350": "#67c7ff",
        "400": "#4bbdff",
        "450": "#30b3ff",
        "500": "#15abff",
        "550": "#009cf6",
        "600": "#008ad9",
        "650": "#0077bc",
        "700": "#00659f",
        "750": "#005382",
        "800": "#004065",
        "850": "#002e48",
        "900": "#001b2b",
        DEFAULT: "#15abff",
      },
      info: {
        "100": "#f1f8fd",
        "150": "#daecfa",
        "200": "#c3e1f8",
        "250": "#acd5f5",
        "300": "#94c9f2",
        "350": "#7dbeef",
        "400": "#66b2ec",
        "450": "#4fa6e9",
        "500": "#379ae6",
        "550": "#1d8de3",
        "600": "#197dca",
        "650": "#166db0",
        "700": "#125d95",
        "750": "#0f4c7b",
        "800": "#0c3c61",
        "850": "#092c47",
        "900": "#061c2d",
        DEFAULT: "#379ae6",
      },
      warning: {
        "100": "#fef9ee",
        "150": "#fcf0d7",
        "200": "#fae7c0",
        "250": "#f8dea9",
        "300": "#f6d491",
        "350": "#f4cb7a",
        "400": "#f2c263",
        "450": "#f0b94b",
        "500": "#efb034",
        "550": "#eca517",
        "600": "#d29211",
        "650": "#b57e0f",
        "700": "#98690c",
        "750": "#7a550a",
        "800": "#5d4108",
        "850": "#402c05",
        "900": "#221803",
        DEFAULT: "#efb034",
      },
      danger: {
        "100": "#fdf2f2",
        "150": "#f9dbdc",
        "200": "#f5c4c6",
        "250": "#f1adaf",
        "300": "#ed9699",
        "350": "#e97f83",
        "400": "#e5696d",
        "450": "#e25256",
        "500": "#de3b40",
        "550": "#d9252b",
        "600": "#c12126",
        "650": "#aa1d22",
        "700": "#93191d",
        "750": "#7b1518",
        "800": "#641114",
        "850": "#4d0d0f",
        "900": "#36090b",
        DEFAULT: "#de3b40",
      },
      success: {
        "100": "#eefdf3",
        "150": "#d3f9e0",
        "200": "#b8f5cd",
        "250": "#9df2b9",
        "300": "#82eea6",
        "350": "#67ea93",
        "400": "#4ce77f",
        "450": "#31e36c",
        "500": "#1dd75b",
        "550": "#1ac052",
        "600": "#17a948",
        "650": "#14923e",
        "700": "#117b34",
        "750": "#0e642a",
        "800": "#0a4d20",
        "850": "#073517",
        "900": "#041e0d",
        DEFAULT: "#1dd75b",
      },
      "color-3": {
        "100": "#fff0f7",
        "150": "#ffdced",
        "200": "#ffc9e2",
        "250": "#ffb6d8",
        "300": "#ffa3ce",
        "350": "#ff90c4",
        "400": "#ff7dba",
        "450": "#ff6aaf",
        "500": "#ff56a5",
        "550": "#ff3392",
        "600": "#ff107f",
        "650": "#eb006e",
        "700": "#c8005d",
        "750": "#a5004d",
        "800": "#81003c",
        "850": "#5e002c",
        "900": "#3a001b",
        DEFAULT: "#ff56a5",
      },
      "color-4": {
        "100": "#fffae1",
        "150": "#fff5c8",
        "200": "#fff0af",
        "250": "#ffec96",
        "300": "#ffe77d",
        "350": "#ffe364",
        "400": "#ffde4b",
        "450": "#ffd932",
        "500": "#ffd317",
        "550": "#f9cc00",
        "600": "#dab200",
        "650": "#bb9900",
        "700": "#9c7f00",
        "750": "#7d6600",
        "800": "#5e4c00",
        "850": "#3e3300",
        "900": "#1f1a00",
        DEFAULT: "#ffd317",
      },
      "color-5": {
        "100": "#fff3f0",
        "150": "#fee1da",
        "200": "#fdcfc4",
        "250": "#fcbdad",
        "300": "#fcab97",
        "350": "#fb9981",
        "400": "#fa876b",
        "450": "#fa7554",
        "500": "#f9623e",
        "550": "#f84a1f",
        "600": "#ef3607",
        "650": "#d02f06",
        "700": "#b12805",
        "750": "#922105",
        "800": "#731a04",
        "850": "#541303",
        "900": "#340c02",
        DEFAULT: "#f9623e",
      },
      "color-6": {
        "100": "#f1fde9",
        "150": "#dffacc",
        "200": "#ccf7ae",
        "250": "#baf490",
        "300": "#a7f172",
        "350": "#94ee54",
        "400": "#82eb37",
        "450": "#6fe819",
        "500": "#62cd14",
        "550": "#57b612",
        "600": "#4ca110",
        "650": "#428b0e",
        "700": "#37750c",
        "750": "#2d5f09",
        "800": "#234907",
        "850": "#183305",
        "900": "#0e1e03",
        DEFAULT: "#62cd14",
      },
    },
    extend: {
      fontSize: {
        t1: ["0.6875rem", "1.125rem"],
        t2: ["0.75rem", "1.25rem"],
        t3: ["0.875rem", "1.375rem"],
        t4: ["1rem", "1.625rem"],
        t5: ["1.125rem", "1.75rem"],
        t6: ["1.25rem", "1.875rem"],
        t7: ["1.5rem", "2.25rem"],
        t8: ["2rem", "3rem"],
        t9: ["2.5rem", "3.5rem"],
        t10: ["3rem", "4.25rem"],
        "t10-1": ["4rem", "5.25rem"],
        "t10-2": ["5rem", "6.5rem"],
        t11: ["6.25rem", "8.125rem"],
        t12: ["12.5rem", "15rem"],
        t13: ["18.75rem", "22.5rem"],
        t14: ["31.25rem", "37.5rem"],
      },
      spacing: {
        s0: "0.125rem",
        s1: "0.25rem",
        s2: "0.375rem",
        s3: "0.5rem",
        s4: "0.75rem",
        s5: "1rem",
        s6: "1.25rem",
        s7: "1.5rem",
        s8: "1.75rem",
        s9: "2rem",
        s10: "2.25rem",
        s11: "2.5rem",
        s12: "2.75rem",
        s13: "3rem",
        s14: "3.5rem",
        s15: "4rem",
        s16: "6rem",
        s17: "8rem",
        s18: "12rem",
        s19: "16rem",
        s20: "24rem",
      },
      fontFamily: {
        heading: "Noto Sans Gothic",
        body: "Manrope",
      },
      width: {
        Sz_NONE: "0rem",
        Sz0: "0.125rem",
        Sz1: "0.25rem",
        Sz2: "0.375rem",
        Sz3: "0.5rem",
        Sz4: "0.75rem",
        Sz5: "1rem",
        Sz6: "1.25rem",
        Sz7: "1.5rem",
        Sz8: "1.75rem",
        Sz9: "2rem",
        Sz10: "2.25rem",
        Sz11: "2.5rem",
        Sz12: "2.75rem",
        Sz13: "3rem",
        Sz14: "3.25rem",
        Sz15: "3.5rem",
        Sz16: "3.75rem",
        Sz17: "4rem",
        Sz18: "6rem",
        Sz19: "8rem",
        Sz20: "12rem",
        Sz21: "16rem",
        Sz22: "24rem",
        Sz23: "32rem",
        Sz24: "40rem",
        Sz25: "48rem",
        Sz26: "56rem",
        Sz27: "64rem",
      },
      height: {
        Sz_NONE: "0rem",
        Sz0: "0.125rem",
        Sz1: "0.25rem",
        Sz2: "0.375rem",
        Sz3: "0.5rem",
        Sz4: "0.75rem",
        Sz5: "1rem",
        Sz6: "1.25rem",
        Sz7: "1.5rem",
        Sz8: "1.75rem",
        Sz9: "2rem",
        Sz10: "2.25rem",
        Sz11: "2.5rem",
        Sz12: "2.75rem",
        Sz13: "3rem",
        Sz14: "3.25rem",
        Sz15: "3.5rem",
        Sz16: "3.75rem",
        Sz17: "4rem",
        Sz18: "6rem",
        Sz19: "8rem",
        Sz20: "12rem",
        Sz21: "16rem",
        Sz22: "24rem",
        Sz23: "32rem",
        Sz24: "40rem",
        Sz25: "48rem",
        Sz26: "56rem",
        Sz27: "64rem",
      },
      borderRadius: {
        xs: "0.125rem",
        s: "0.1875rem",
        m: "0.25rem",
        l: "0.375rem",
        xl: "0.5rem",
        "100-percent": "100%",
      },
      boxShadow: {
        xs: "0px 0px 1px rgba(23, 26, 31, 0.06), 0px 0px 2px rgba(23, 26, 31, 0.12)",
        s: "0px 1.5px 4px rgba(23, 26, 31, 0.08), 0px 0px 2px rgba(23, 26, 31, 0.12)",
        m: "0px 3px 7px rgba(23, 26, 31, 0.1), 0px 0px 2px rgba(23, 26, 31, 0.12)",
        l: "0px 6px 13px rgba(23, 26, 31, 0.14), 0px 0px 2px rgba(23, 26, 31, 0.12)",
        xl: "0px 12.75px 26.5px rgba(23, 26, 31, 0.23), 0px 0px 2px rgba(23, 26, 31, 0.12)",
      },
      colors: {},
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".hide-scrollbar": {
          scrollbarWidth: "none" /* Firefox */,
          "-ms-overflow-style": "none" /* Internet Explorer and Edge */,
          "&::-webkit-scrollbar": {
            /* Chrome, Safari and Opera */ display: "none",
          },
        },
        ".badge": {},
      };
      addUtilities(newUtilities);
    },
  ],
};
export default config;
