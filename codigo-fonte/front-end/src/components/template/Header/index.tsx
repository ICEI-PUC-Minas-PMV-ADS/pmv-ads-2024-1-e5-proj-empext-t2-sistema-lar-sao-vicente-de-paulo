import { Logo } from "@/components/logo";
import { ModalDefault } from "@/components/modal/ModalDefault";
import { authToken } from "@/config/authToken";
import { IUsuarioAuth } from "@/interface/IUsuarioAuth";
import { setAuthToken, setAuthUsuario } from "@/redux/slices/auth.slice";
import { useMutation } from "@/utils/hooks/useMutation";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import { regexCPF } from "@/utils/regex/regexCPF";
import {
  EditOutlined,
  FileTextOutlined,
  LockOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown, Modal, Space } from "antd";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { useCookies } from "react-cookie";
import { AlterarSenhaModal } from "./components/AlterarSenhaModal";
import { AtualizarUsuarioLogadoModal } from "./components/AtualizarUsuarioLogadoModal";
import { IUsuario } from "@/app/(app)/usuario/Interface/IUsuario";
import { useFetch } from "@/utils/hooks/useFetch";

export const headerMenus = [
  {
    icon: <UserOutlined />,
    menu: "Cadastros",
    key: "menu-cadastro",
    itens: [
      {
        key: "key-idoso",
        label: "Idosos",
        path: "/idoso",
      },
      {
        key: "key-usuario",
        label: "Usuários",
        path: "/usuario",
      },
      {
        key: "key-cargo",
        label: "Cargos",
        path: "/cargo",
      },
    ],
  },
  {
    icon: <FileTextOutlined />,
    menu: "Relatórios",

    key: "menu-relatorio",
    itens: [
      {
        key: "key-pia",
        label: "Modelo PIA",
        path: "/modelo-pia",
      },
      {
        key: "key-pia",
        label: "PIA",
        path: "/relatorio-pia",
      },
      {
        key: "key-nutricional",
        label: "Nutricional",
        path: "/nutricional",
      },
    ],
  },
];

export const Header = () => {
  const usuarioAuth = useAppSelector((r) => r.auth.usuario);

  const { data: usuario, refetch } = useFetch<IUsuario>(
    "/usuarios/" + usuarioAuth.uid,
    [usuarioAuth.uid],
    {
      enable: !!usuarioAuth,
    }
  );

  const [cookie, setCookie, removeCookie] = useCookies([authToken.nome]);
  const dispatch = useAppDispatch();

  const { mutate: mutateDeslogar } = useMutation<{ token: string }>(
    "/auth/logout",
    {
      method: "post",
      messageSucess: null,
      onSuccess: () => {
        dispatch(setAuthToken(null as any));
        dispatch(setAuthUsuario(null as any));
        removeCookie(authToken.nome);
      },
    }
  );

  return (
    <nav className="bg-primaria">
      <div className="h-[4.25rem] ml-16 mr-16 flex flex-row md:flex-row items-center justify-between">
        <div className="flex h-full items-center">
          <Link href="/" className="hover:cursor-pointer hover:opacity-90">
            <Logo className="mr-16" />
          </Link>
          {headerMenus.map((header) => (
            <div
              key={header.key}
              className="w-[10.125rem] h-full justify-center flex hover:bg-azul2/30 transition-all cursor-pointer"
            >
              <Dropdown
                placement="top"
                className="w-full flex justify-center items-center"
                dropdownRender={(m) => (
                  <div className="flex flex-col w-full gap-[8px] bg-white shadow-lg rounded-lg p-[10px]">
                    {header.itens.map((item) => (
                      <Link
                        key={item.key}
                        className="appearance-none p-[10px] rounded-lg hover:bg-primaria transition-all text-black font-semibold hover:text-white hover:cursor-pointer"
                        href={item.path}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              >
                <Space>
                  <div className="text-lg text-white font-medium flex gap-[8px]">
                    {header.icon}
                    {header.menu}
                  </div>
                </Space>
              </Dropdown>
            </div>
          ))}
        </div>
        <div className="h-full justify-center flex cursor-pointer">
          <Dropdown
            placement="top"
            dropdownRender={(m) => (
              <div className="flex flex-col w-full min-w-[150px] gap-[8px] bg-white shadow-lg rounded-lg p-[10px]">
                {usuario && <Perfil usuario={usuario} refetch={refetch} />}

                <button
                  onClick={() =>
                    mutateDeslogar({ token: cookie[authToken.nome] })
                  }
                  type="button"
                  className="appearance-none text-left p-[10px] rounded-lg hover:bg-primaria transition-all text-black font-semibold hover:text-white"
                >
                  <LoginOutlined /> Deslogar
                </button>
              </div>
            )}
          >
            <Space>
              <div className="flex h-full items-center gap-3 justify-end hover:bg-azul2/30 min-w-[170px] pl-[30px] rounded-full p-[8px]">
                <div className="flex flex-col text-right">
                  <strong className="text-white text-sm font-semibold">
                    {usuario?.nome}
                  </strong>
                  <span className="text-white text-sm text-gray-300">
                    {usuario?.cargo?.nome}
                  </span>
                </div>

                <div
                  style={{
                    backgroundImage: usuario?.foto && `url(${usuario?.foto})`,
                  }}
                  className="w-[38px] h-[38px] bg-azul2 rounded-full bg-cover flex justify-center items-center text-black/90"
                >
                  {!usuario?.foto && <UserOutlined className="text-[21px]" />}
                </div>
              </div>
            </Space>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

const Perfil = ({
  usuario,
  refetch,
}: {
  usuario: IUsuario;
  refetch: () => void;
}) => {
  const [openPerfil, setOpenPerfil] = useState(false);
  const showModalDefault = () => {
    setOpenPerfil(true);
  };

  const handleCancel = () => {
    setOpenPerfil(false);
  };

  return (
    <>
      <button
        type="button"
        className="appearance-none p-[10px] text-left rounded-lg hover:bg-primaria transition-all text-black font-semibold hover:text-white hover:cursor-pointer"
        onClick={showModalDefault}
      >
        <UserOutlined /> Perfil
      </button>
      <Modal
        onCancel={handleCancel}
        open={openPerfil}
        width={350}
        styles={{
          content: { margin: 24 },
          body: { margin: "24px 0" },
          header: { marginBottom: 8 },
        }}
        footer={
          <div className="flex gap-2 justify-end">
            <AlterarSenhaModal />
            <AtualizarUsuarioLogadoModal
              uid={usuario.uid}
              refetchUser={refetch}
            />
          </div>
        }
      >
        <div className="flex gap-[20px] flex-col">
          <div className="justify-center items-center text-center flex flex-col gap-[15px]">
            <Avatar
              style={{ backgroundColor: "#007AE5" }}
              size={80}
              src={usuario.foto}
              icon={<UserOutlined />}
            />
            <div>
              <p className="text-primaria text-lg font-bold">{usuario.nome}</p>
              <p>{usuario?.cargo?.nome}</p>
            </div>
          </div>
          <div className="flex gap-[15px]">
            <div className="font-medium">
              <p>E-mail</p>
              <p>CPF</p>
            </div>
            <div className="text-black/70">
              <p>{usuario.email}</p>
              <p>{regexCPF(usuario.cpf_cnh)}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
