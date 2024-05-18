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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

type TTableCompProps = {
  headerObj: Record<string, TTableHeaderInfo>;
  dataList: Record<string, any>[];
};
const TableComp = ({
  headerObj,
  dataList,
}: TTableCompProps): React.ReactNode => {
  console.log(headerObj, dataList);
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
                    case "img":
                      return (
                        <TableCell key={key}>
                          <Image src={value} alt="img" />
                        </TableCell>
                      );

                    default:
                      return <TableCell key={key}>{value}</TableCell>;
                  }
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
