/*
  Warnings:

  - Added the required column `github_oauth` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `github_oauth` VARCHAR(191) NOT NULL;
