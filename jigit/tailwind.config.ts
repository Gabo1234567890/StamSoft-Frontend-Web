import { type Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,css}"],

  theme: {
    extend: {
      colors: {
        primary1: "#4110ea",
        primary2: "#b9dced",

        secondary1: "#82e9ed",
        secondary2: "#250d77",

        base: {
          0: "#ffffff",
          30: "#e6e6e6",
          40: "#d1d1d1",
          60: "#ababab",
          90: "#666666",
          100: "#221f1f",
        },

        functional: {
          success: "#4ccb85",
          warning: "#f89a0d",
          error: "#ea3535",
        },
      },

      fontFamily: {
        primary: "Murecho",
        secondary: "Ubuntu",
      },

      fontSize: {
        heading0: ["58px", { fontWeight: "500", lineHeight: "48px" }],
        heading1: ["40px", { fontWeight: "700", lineHeight: "48px" }],
        heading2: ["32px", { fontWeight: "500", lineHeight: "40px" }],
        heading3: ["28px", { fontWeight: "500", lineHeight: "28px" }],
        heading3light: ["28px", { fontWeight: "300", lineHeight: "28px" }],

        body1: ["24px", { fontWeight: "500", lineHeight: "28px" }],
        body2: ["20px", { fontWeight: "500", lineHeight: "24px" }],

        paragraphMedium1: ["16px", { fontWeight: "500", lineHeight: "20px" }],
        paragraphMedium2: ["14px", { fontWeight: "500", lineHeight: "16px" }],
        paragraphMedium3: ["12px", { fontWeight: "500", lineHeight: "16px" }],

        paragraphRegular1: ["16px", { fontWeight: "400", lineHeight: "20px" }],
        paragraphRegular2: ["14px", { fontWeight: "400", lineHeight: "16px" }],
        paragraphRegular3: ["12px", { fontWeight: "400", lineHeight: "16px" }],

        caption: ["10px", { fontWeight: "300", lineHeight: "12px" }],
      },

      boxShadow: {
        subtle: "0px 0px 4px 0px rgba(0, 0, 0, 0.10)",
      },
    },
  },

  plugins: [],
};

export default config;
