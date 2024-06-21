"use client";
import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { usePathname } from "next/navigation";
import { headerMenus } from "../Header";
import { HomeOutlined } from "@ant-design/icons";
import Link from "next/link";

export const CommonBreadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "");

  const home = {
    title: (
      <div className="flex gap-1.5">
        {pathname === "/" && <HomeOutlined />} Home
      </div>
    ),
    ...(pathname === "/" ? {} : { path: "/" }),
  };

  const submenus: ItemType[] = segments.map((path) => {
    const menu = headerMenus.find((v) => {
      return v.itens.find((d) => d.path === "/" + path);
    });
    const itemPath = menu?.itens.find((i) => i.path === "/" + path);
    return {
      title: (
        <div className="flex gap-1.5">
          {itemPath?.path === pathname && menu?.icon} {itemPath?.label}
        </div>
      ),
      ...(itemPath?.path !== pathname ? { path: itemPath?.path } : {}),
    };
  });

  return (
    <div className="h-11 mx-16 my-7 border-b border-cinza2">
      <Breadcrumb
        items={[home, ...submenus]}
        itemRender={(currentRoute, params, items, paths) => {
          const isLast = currentRoute?.path === items[items.length - 1]?.path;

          return isLast ? (
            <span>{currentRoute.title}</span>
          ) : (
            <Link href={`/${paths.join("/")}`}>{currentRoute.title}</Link>
          );
        }}
      />
    </div>
  );
};
