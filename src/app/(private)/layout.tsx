import PrivateHeader from "@/components/layouts/PrivateHeader";
import React from "react";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PrivateHeader />
      <div className="container mx-auto px-8 py-8">{children}</div>
    </>
  );
}
