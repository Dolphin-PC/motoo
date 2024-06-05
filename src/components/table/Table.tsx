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
import { TTableHeaderInfo } from "@/service/common/CommonService";
import Image from "next/image";
import Link from "next/link";

export type TTableCompProps = {
  headerObj: Record<string, TTableHeaderInfo>;
  dataList: Record<string, any>[];
};

/** @desc CommonService에 등록된 테이블 헤더 정보를 바탕으로 테이블을 생성합니다.
 *
 * @param props
 * @returns
 */
const TableComp = (props: TTableCompProps): React.ReactNode => {
  const { headerObj = {}, dataList = [] } = props;
  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650 }}
        aria-label="simple table"
        className="whitespace-nowrap"
      >
        <TableHead>
          <TableRow>
            {Object.values(headerObj).map((header) => (
              <TableCell className="text-center" key={header.key}>
                {header.displayName}
              </TableCell>
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
                          {value && new Date(value).toLocaleDateString()}
                        </TableCell>
                      );
                    case "number":
                      return (
                        <TableCell key={key} className="text-center">
                          {value ? value.toLocaleString() : "-"}
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
                    case "value":
                      return (
                        <TableCell key={key}>{header.value[value]}</TableCell>
                      );
                    case "link":
                      return (
                        <TableCell key={key}>
                          <Link href={header.value + `/${rowObj.id}`}>
                            Detail
                          </Link>
                        </TableCell>
                      );
                  }
                  return (
                    <TableCell key={key} className="text-center">
                      {value}
                    </TableCell>
                  );
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
