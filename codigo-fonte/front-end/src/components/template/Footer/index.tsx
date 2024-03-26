
import Image from "next/image";

import LogoPuc from "./logopuc.png"
import { Logomarca } from "@/components/logo";

export const Footer = () => {
  return <footer className="fixed inset-x-0 bottom-0 bg-cinza">
    <div className="">
      <div className="flex h-[6.5rem] ml-16 mr-16 flex-row md:flex-row items-center justify-between">
        <div className="max-w-[439px] flex h-[4rem] items-center">
          <Image width={52} height={46} src={LogoPuc} alt={""} />
          <div className="ml-8 mr-5 h-full w-[1px] bg-cinza2"></div>
          <span className="text-[0.625rem]">Desenvolvido por Ana Carolina, Gustavo Augusto, Jéssica Gonçalves, João Paulo Jorges, Mariano Teixeira e Thiago Terra.</span>
        </div>
        <Logomarca width={175} height={47} />
      </div>
    </div>

  </footer >;
};
