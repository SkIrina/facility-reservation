import "./globals.css";
import React from "react";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sport Facility Reservation System",
  description: "スポーツ施設予約システム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
