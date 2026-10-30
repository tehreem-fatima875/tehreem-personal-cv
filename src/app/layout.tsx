import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tehreem Fatima | Web Development & Digital Marketing",
  description: "Tehreem Fatima is a Full-Stack Web Developer and Digital Marketing Specialist based in Lahore, Pakistan.",
  openGraph: { title: "Tehreem Fatima | Web Development & Digital Marketing", description: "Building digital experiences and developing strategies that help businesses grow.", type: "profile" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
