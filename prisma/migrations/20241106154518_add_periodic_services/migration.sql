/*
  Warnings:

  - You are about to drop the column `type` on the `Service` table. All the data in the column will be lost.
  - Added the required column `name` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "type",
ADD COLUMN     "company" TEXT,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropEnum
DROP TYPE "ServiceType";

-- CreateTable
CREATE TABLE "PeriodicService" (
    "id" SERIAL NOT NULL,
    "comments" TEXT,
    "company" TEXT,
    "cost" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "carId" INTEGER NOT NULL,

    CONSTRAINT "PeriodicService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PeriodicService" ADD CONSTRAINT "PeriodicService_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
