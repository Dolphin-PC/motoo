-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `last_login_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_yn` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `account_number` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `delete_yn` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AccountInfo` (
    `account_number` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `default_account_yn` BOOLEAN NOT NULL DEFAULT false,
    `account_expired_at` DATETIME(3) NULL,
    `app_key` LONGTEXT NOT NULL,
    `app_secret` LONGTEXT NOT NULL,
    `api_token` LONGTEXT NULL,
    `api_token_expired_at` DATETIME(3) NULL,
    `approval_key` LONGTEXT NULL,

    PRIMARY KEY (`account_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AmountMoney` (
    `account_number` VARCHAR(191) NOT NULL,
    `dnca_tot_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `nxdy_excc_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `prvs_rcdl_excc_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `cma_evlu_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `bfdy_buy_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `thdt_buy_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `bfdy_sll_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `thdt_sll_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `scts_evlu_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `tot_evlu_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `nass_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `pchs_amt_smtl_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `evlu_amt_smtl_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `evlu_pfls_smtl_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `bfdy_tot_asst_evlu_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `asst_icdc_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `nxdy_auto_rdpt_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `d2_auto_rdpt_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `bfdy_tlex_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `thdt_tlex_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `tot_loan_amt` VARCHAR(191) NOT NULL DEFAULT '0',
    `fncg_gld_auto_rdpt_yn` VARCHAR(191) NOT NULL DEFAULT '0',
    `tot_stln_slng_chgs` VARCHAR(191) NOT NULL DEFAULT '0',
    `asst_icdc_erng_rt` VARCHAR(191) NOT NULL DEFAULT '0',

    PRIMARY KEY (`account_number`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AmountStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stock_id` VARCHAR(191) NOT NULL,
    `account_number` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `avg_amount` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `AmountStock_stock_id_account_number_key`(`stock_id`, `account_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroupLikeStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(191) NOT NULL,
    `group_prioirty` INTEGER NOT NULL,
    `account_number` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LikeStock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stock_id` VARCHAR(191) NOT NULL,
    `group_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StockOrderHistory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `stock_id` VARCHAR(191) NOT NULL,
    `account_number` VARCHAR(191) NOT NULL,
    `order_type` INTEGER NOT NULL,
    `order_status` INTEGER NOT NULL,
    `order_time` DATETIME(3) NOT NULL,
    `conclusion_time` DATETIME(3) NULL,
    `order_price` INTEGER NOT NULL,
    `order_quantity` INTEGER NOT NULL,
    `conclusion_price` INTEGER NULL,

    UNIQUE INDEX `StockOrderHistory_stock_id_key`(`stock_id`),
    UNIQUE INDEX `StockOrderHistory_account_number_key`(`account_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StockInfo` (
    `stock_id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `img_src` VARCHAR(191) NULL,
    `price` INTEGER NULL,
    `price_update_at` DATETIME(3) NULL,

    PRIMARY KEY (`stock_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Notice` ADD CONSTRAINT `Notice_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notice` ADD CONSTRAINT `Notice_account_number_fkey` FOREIGN KEY (`account_number`) REFERENCES `AccountInfo`(`account_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AccountInfo` ADD CONSTRAINT `AccountInfo_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AmountMoney` ADD CONSTRAINT `AmountMoney_account_number_fkey` FOREIGN KEY (`account_number`) REFERENCES `AccountInfo`(`account_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AmountStock` ADD CONSTRAINT `AmountStock_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `StockInfo`(`stock_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AmountStock` ADD CONSTRAINT `AmountStock_account_number_fkey` FOREIGN KEY (`account_number`) REFERENCES `AccountInfo`(`account_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupLikeStock` ADD CONSTRAINT `GroupLikeStock_account_number_fkey` FOREIGN KEY (`account_number`) REFERENCES `AccountInfo`(`account_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeStock` ADD CONSTRAINT `LikeStock_group_id_fkey` FOREIGN KEY (`group_id`) REFERENCES `GroupLikeStock`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LikeStock` ADD CONSTRAINT `LikeStock_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `StockInfo`(`stock_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockOrderHistory` ADD CONSTRAINT `StockOrderHistory_account_number_fkey` FOREIGN KEY (`account_number`) REFERENCES `AccountInfo`(`account_number`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockOrderHistory` ADD CONSTRAINT `StockOrderHistory_stock_id_fkey` FOREIGN KEY (`stock_id`) REFERENCES `StockInfo`(`stock_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
