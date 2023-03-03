/*
  Warnings:

  - The primary key for the `LoginToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `LoginToken` table. All the data in the column will be lost.
  - The required column `token` was added to the `LoginToken` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX `LoginToken_id_idx` ON `LoginToken`;

-- AlterTable
ALTER TABLE `LoginToken` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `token` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`token`);

-- CreateIndex
CREATE INDEX `LoginToken_token_idx` ON `LoginToken`(`token`);
