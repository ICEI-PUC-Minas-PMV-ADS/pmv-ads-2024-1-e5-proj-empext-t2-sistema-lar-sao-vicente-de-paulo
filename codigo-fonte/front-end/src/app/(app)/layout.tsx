"use client";

import { CommonBreadcrumbs } from "@/components/template/Breadcrumb";
import { Footer } from "@/components/template/Footer";
import { Header } from "@/components/template/Header";
import { AuthApp } from "@/utils/providers/AuthApp";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthApp>
      <div className="relative min-h-[100vh]">
        <Header />
        <CommonBreadcrumbs />
        <div className="mx-16 mt-7 content-wrap pb-[180px]">{children}</div>
        <Footer />
      </div>
    </AuthApp>
  );
}
