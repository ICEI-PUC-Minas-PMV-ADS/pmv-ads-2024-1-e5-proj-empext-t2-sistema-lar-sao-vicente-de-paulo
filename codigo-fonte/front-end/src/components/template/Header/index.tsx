import { Logo } from "@/components/logo";
import ProfileIcon from "@/components/logo/Profile";
import { authToken } from "@/config/authToken";
import { setAuthToken, setAuthUsuario } from "@/redux/slices/auth.slice";
import { useMutation } from "@/utils/hooks/useMutation";
import { useAppDispatch, useAppSelector } from "@/utils/hooks/useRedux";
import {
  FileTextOutlined,
  LoginOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import Link from "next/link";
import { useCookies } from "react-cookie";

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
        key: "key-prontuario",
        label: "Prontuário",
        path: "/prontuario",
      },
      {
        key: "key-pia",
        label: "PIA",
        path: "/pia",
      },
      {
        key: "key-nutricional",
        label: "Nutricional",
        path: "/nutricional",
      },
      {
        key: "key-braden",
        label: "Escala de Braden",
        path: "/escalabraden",
      },
      {
        key: "key-perroca",
        label: "Tabela de Perroca",
        path: "/tabelaperroca",
      },
      {
        key: "key-sistematizacao",
        label: "Sistematização",
        path: "/sistematizacao",
      },
    ],
  },
];

export const Header = () => {
  const usuario = useAppSelector((r) => r.auth.usuario);

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
                <Link
                  className="appearance-none p-[10px] text-left rounded-lg hover:bg-primaria transition-all text-black font-semibold hover:text-white hover:cursor-pointer"
                  href={"perfil"}
                >
                  <UserOutlined /> Perfil
                </Link>
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
              <div className="flex h-full items-center gap-3 justify-end hover:bg-azul2/30 min-w-[170px] rounded-full p-[8px]">
                <div className="flex flex-col text-right">
                  <strong className="text-white text-sm font-semibold">
                    {usuario.nome}
                  </strong>
                  <span className="text-white text-sm text-gray-300">
                    {usuario.cargo.nome}
                  </span>
                </div>
                <ProfileIcon />
              </div>
            </Space>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};
