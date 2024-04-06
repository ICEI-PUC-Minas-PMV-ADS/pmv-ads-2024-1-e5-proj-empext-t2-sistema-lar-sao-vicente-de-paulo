import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Dispatch, SetStateAction } from "react";

interface ITableDefault {
  dataSource: any[] | undefined;
  columns: ColumnsType<any>;
  totalCount: number | null;
  setPageLimit: Dispatch<SetStateAction<number>>;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const TableDefault = ({
  dataSource,
  columns,
  totalCount,
  setPageLimit,
  setCurrentPage,
}: ITableDefault) => {
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowKey={(dataSource) => dataSource.uid}
      size="middle"
      pagination={{
        total: totalCount || 0,
        showTotal: (total) => `Total de ${total} items`,
        onChange: (page, pageSize) => {
          setPageLimit(pageSize);
          setCurrentPage(page);
        },
        showSizeChanger: true,
        pageSizeOptions: [10, 20, 30, 50, 100],
        size: "default",
      }}
    />
  );
};
