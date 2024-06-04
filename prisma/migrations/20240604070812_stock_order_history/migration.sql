/*
  Warnings:

  - The primary key for the `StockOrderHistory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `StockOrderHistory` table. All the data in the column will be lost.
  - Added the required column `oder_no` to the `StockOrderHistory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ooder_no` to the `StockOrderHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `AccountInfo` ADD COLUMN `hts_id` VARCHAR(191) NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE `StockOrderHistory` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `oder_no` VARCHAR(191) NOT NULL,
    ADD COLUMN `ooder_no` VARCHAR(191) NOT NULL,
    MODIFY `order_time` VARCHAR(191) NULL,
    MODIFY `conclusion_time` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`oder_no`);
