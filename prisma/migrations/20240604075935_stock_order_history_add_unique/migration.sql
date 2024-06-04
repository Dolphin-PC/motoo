/*
  Warnings:

  - A unique constraint covering the columns `[oder_no,stock_id,account_number]` on the table `StockOrderHistory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `StockOrderHistory_oder_no_stock_id_account_number_key` ON `StockOrderHistory`(`oder_no`, `stock_id`, `account_number`);
