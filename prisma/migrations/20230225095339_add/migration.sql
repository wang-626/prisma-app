-- CreateTable
CREATE TABLE `LoginToken` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `device` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,

    INDEX `LoginToken_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LoginToken` ADD CONSTRAINT `LoginToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
