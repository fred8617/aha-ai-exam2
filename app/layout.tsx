import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import NavBar, { Menu } from "@/components/NavBar";
import MenuIcon from "@/components/icons/Menu";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Aha AI Exam2",
  description: "Generated by create next app",
};

// This may be retrieved from some BE api with user session / info
// This also can be extracted to a single routes file
const menus: Menu[] = [
  { route: "/", label: "Home", icon: MenuIcon },
  { route: "/tags", label: "Tags", icon: MenuIcon, dot: true },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={ubuntu.className}>
        <ThemeProvider theme={theme}>
          <div className="flex">
            <NavBar menus={menus} />
            <div className="text-white flex-auto bg-[var(--Greyscale-BG---dark)]">
              {children}
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
