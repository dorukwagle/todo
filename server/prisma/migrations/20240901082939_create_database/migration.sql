/*
  Warnings:

  - Added the required column `updatedAt` to the `Todos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Todos` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `status` ENUM('Pending', 'Completed') NOT NULL DEFAULT 'Pending',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
