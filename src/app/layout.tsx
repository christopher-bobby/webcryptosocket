import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Crypto Market List",
  description: "by Christopher",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Jakarta:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
