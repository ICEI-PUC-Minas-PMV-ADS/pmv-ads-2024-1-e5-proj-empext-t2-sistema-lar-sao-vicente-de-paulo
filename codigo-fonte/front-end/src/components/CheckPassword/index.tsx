import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useEffect } from "react";

export const CheckPassword = ({
  password,
  check,
}: {
  password: string;
  check: (value: boolean) => void;
}) => {
  let incluiMinimoCaractere = false;
  let incluiMinusculoMaiusculo = false;
  let incluiNumero = false;
  let incluiCaractereEspecial = false;

  if (password && password.length > 8) {
    incluiMinimoCaractere = true;
  } else {
    incluiMinimoCaractere = false;
  }

  if (password && password.match(/[a-z]/) && password.match(/[A-Z]/)) {
    incluiMinusculoMaiusculo = true;
  } else {
    incluiMinusculoMaiusculo = false;
  }

  if (password && password.match(/\d/)) {
    incluiNumero = true;
  } else {
    incluiNumero = false;
  }

  if (password && password.match(/[^a-zA-Z\d]/)) {
    incluiCaractereEspecial = true;
  } else {
    incluiCaractereEspecial = false;
  }

  useEffect(
    () => {
      if (
        incluiMinimoCaractere &&
        incluiMinusculoMaiusculo &&
        incluiNumero &&
        incluiCaractereEspecial
      ) {
        check(true);
      } else {
        check(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      incluiMinimoCaractere,
      incluiMinusculoMaiusculo,
      incluiNumero,
      incluiCaractereEspecial,
    ]
  );

  return (
    <ul className="text-[12px]">
      <li
        className={incluiMinimoCaractere ? "text-secundaria" : "text-red-600"}
      >
        {incluiMinimoCaractere ? (
          <CheckCircleOutlined />
        ) : (
          <ExclamationCircleOutlined />
        )}{" "}
        Mínimo de 8 caracteres.
      </li>
      <li
        className={
          incluiMinusculoMaiusculo ? "text-secundaria" : "text-red-600"
        }
      >
        {incluiMinusculoMaiusculo ? (
          <CheckCircleOutlined />
        ) : (
          <ExclamationCircleOutlined />
        )}{" "}
        Use letras minúsculas e maiúsculas.
      </li>
      <li className={incluiNumero ? "text-secundaria" : "text-red-600"}>
        {incluiNumero ? <CheckCircleOutlined /> : <ExclamationCircleOutlined />}{" "}
        Inclua pelo menos um número.
      </li>
      <li
        className={incluiCaractereEspecial ? "text-secundaria" : "text-red-600"}
      >
        {incluiCaractereEspecial ? (
          <CheckCircleOutlined />
        ) : (
          <ExclamationCircleOutlined />
        )}{" "}
        Inclua pelo menos um caractere especial.
      </li>
    </ul>
  );
};
