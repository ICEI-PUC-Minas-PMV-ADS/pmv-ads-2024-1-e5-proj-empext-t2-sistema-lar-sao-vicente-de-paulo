import Image from "next/image";
import { Logomarca } from "@/components/logo";

export const Footer = () => {
  return (
    <footer className="w-full bg-cinza footer">
      <div className="flex h-[6.5rem] bg-cinza ml-16 mr-16 flex-row md:flex-row items-center justify-between">
        <div className="max-w-[439px] flex h-[4rem] items-center">
          <Image width={52} height={46} src={"/footer/logopuc.png"} alt={""} />
          <div className="ml-8 mr-5 h-full w-[1px] bg-cinza2"></div>
          <span className="text-[0.625rem]">
            Desenvolvido por Ana Carolina, Gustavo Augusto, Jéssica Gonçalves,
            João Paulo Jorges, Mariano Teixeira e Thiago Terra.
          </span>
        </div>
        <Logomarca width={175} height={47} />
      </div>
    </footer>
  );
};
