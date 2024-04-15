"use client";

import { Logomarca } from "@/components/logo";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" h-[100vh] flex justify-between items-center w-full">
      <div className="bg-[url('/login/login_bg.png')] bg-cover bg-right lg:w-[70%] w-[60%] h-full lg:p-[120px] p-[40px]">
        <Logomarca className="lg:w-[365px] w-[200px]" />
      </div>
      <div className="flex justify-center items-center lg:w-[30%] w-[40%]">
        <div className="w-full max-w-[345px] lg:mx-[70px] mx-[40px] ">
          {children}
        </div>
      </div>
    </div>
  );
}
