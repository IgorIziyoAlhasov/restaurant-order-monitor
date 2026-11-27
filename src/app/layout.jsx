import { cookies } from "next/headers";
import { Providers } from "./providers";
import { messages } from "../locales/messages";
import "../styles/tailwind.css";
import "../styles/globals.scss";

export const metadata = { title: "Restaurant Monitor | ROP" };

export default async function RootLayout({ children }) {
  const jar = await cookies();
  const requested = jar.get("rom_language")?.value;
  const language = Object.hasOwn(messages, requested ?? "") ? requested : "en";
  const theme = jar.get("rom_theme")?.value === "dark" ? "dark" : "light";
  return (
    <html
      lang={language}
      dir={language === "he" ? "rtl" : "ltr"}
      data-theme={theme}
    >
      <body>
        <Providers language={language} theme={theme}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
