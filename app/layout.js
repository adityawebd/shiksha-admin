import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin panel",
  description: "Admin panel",

  
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/assets/images/image_UB.png" type="image/x-icon"/>
      </head>
      
      <body className={inter.className}>{children}</body>
    </html>
  );
}
