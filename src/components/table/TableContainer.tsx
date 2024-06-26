import CommonService, { TTableName } from "@/service/common/CommonService";
import React from "react";
import TableComp, { TTableCompProps } from "./Table";
type TableContainerProps = Omit<TTableCompProps, "headerObj"> & {
  tableName: TTableName;
};
const TableContainer = ({ tableName, dataList }: TableContainerProps) => {
  const tableHeader = CommonService.getTableHeader(tableName);

  return <TableComp headerObj={tableHeader} dataList={dataList} />;
  // return <div>dsa</div>;
};

export default TableContainer;
