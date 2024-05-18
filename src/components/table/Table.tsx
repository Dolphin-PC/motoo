"use client";
import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { TTableHeaderInfo } from "@/pages/service/common/CommonService";
import Image from "next/image";

type TTableCompProps = {
  headerObj: Record<string, TTableHeaderInfo>;
  dataList: Record<string, any>[];
};
const TableComp = (props: TTableCompProps): React.ReactNode => {
  const { headerObj = {}, dataList = [] } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {Object.values(headerObj).map((header) => (
              <TableCell key={header.key}>{header.displayName}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.map((rowObj, index) => {
            return (
              <TableRow key={index}>
                {Object.entries(headerObj).map(([key, header]) => {
                  const value = rowObj[header.key];
                  switch (header.type) {
                    case "Date":
                      return (
                        <TableCell key={key}>
                          {new Date(value).toLocaleDateString()}
                        </TableCell>
                      );
                    case "number":
                      return (
                        <TableCell key={key}>
                          {value.toLocaleString()}
                        </TableCell>
                      );
                    case "img":
                      return (
                        <TableCell key={key}>
                          <Image
                            src={
                              value
                                ? `/public/stocks/${value}.png`
                                : "/public/stocks/main_icon.svg"
                            }
                            alt="img"
                            width={24}
                            height={24}
                          />
                        </TableCell>
                      );
                  }
                  return <TableCell key={key}>{value}</TableCell>;
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableComp;
