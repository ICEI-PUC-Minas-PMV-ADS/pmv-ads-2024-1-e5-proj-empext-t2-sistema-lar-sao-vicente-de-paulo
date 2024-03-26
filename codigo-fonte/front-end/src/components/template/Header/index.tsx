import { Logo } from "@/components/logo";
import ProfileIcon from "@/components/logo/Profile";
import { Dropdown, MenuProps, Space } from "antd";

const cadastros: MenuProps['items'] = [
  {
    key: 'key-idoso',
    label: 'Idosos',
    style: {
      width: '10.125rem',
      height: '2.5rem'
    }
  },
  {
    key: 'key-usuario',
    label: 'Usuário',
  },
  {
    key: 'key-cargo',
    label: 'Cargos',
  },
];

const relatorios: MenuProps['items'] = [
  {
    key: 'key-prontuario',
    label: 'Prontuário',
    style: {
      width: '10.125rem',
      height: '2.5rem'
    }
  },
  {
    key: 'key-pia',
    label: 'PIA',
  },
  {
    key: 'key-nutricional',
    label: 'Nutricional',
  },
  {
    key: 'key-braden',
    label: 'Escala de Braden',
  },
  {
    key: 'key-perroca',
    label: 'Tabela de Perroca',
  },
  {
    key: 'key-sistematizacao',
    label: 'Sistematização',
  },
];

const perfil: MenuProps['items'] = [
  {
    key: 'key-perfil',
    label: 'Perfil',
    style: {
      width: '10.125rem',
      height: '2.5rem',
    }
  },
  {
    key: 'key-deslogar',
    label: 'Deslogar',
  },
];

export const Header = () => {
  return (
    <nav className="bg-primaria">
      <div className="h-[4.25rem] ml-16 mr-16 flex flex-row md:flex-row items-center justify-between">
        <div className="flex h-full items-center">
          <Logo />
          <div className="ml-16 w-[10.125rem] h-full justify-center flex hover:bg-azul2 transition cursor-pointer">
            <Dropdown placement="topCenter" menu={{ items: cadastros }}>
              <Space>
                <div className="text-lg text-white font-medium">
                  Cadastros
                </div>
              </Space>
            </Dropdown>
          </div>
          <div className="w-[10.125rem] h-full justify-center flex hover:bg-azul2 cursor-pointer">
            <Dropdown placement="topCenter" menu={{ items: relatorios }}>
              <Space>
                <div className="text-lg text-white font-medium">
                  Relatórios
                </div>
              </Space>
            </Dropdown>
          </div>
        </div>
        <div className="w-[10.125rem] h-full justify-center flex cursor-pointer">
          <Dropdown placement="topCenter" menu={{ items: perfil }}>
            <Space>
              <div className="flex h-full justify-center flex-row-reverse items-center gap-3">
                <ProfileIcon />
                <div className="flex flex-col text-right">
                  <strong className="text-white text-sm font-semibold">José da Silva</strong>
                  <span className="text-white text-sm text-gray-300">Gerente</span>
                </div>
              </div>
            </Space>
          </Dropdown>
        </div>
      </div>
    </nav >
  );
};
