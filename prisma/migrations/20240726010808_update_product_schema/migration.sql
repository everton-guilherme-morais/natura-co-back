/*
  Warnings:

  - You are about to drop the column `comments` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `for` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `valueInitial` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `valueOfficial` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instalments` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceInitial` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priceWithDiscount` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sex` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_productId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "comments",
DROP COLUMN "for",
DROP COLUMN "valueInitial",
DROP COLUMN "valueOfficial",
ADD COLUMN     "brand" TEXT NOT NULL,
ADD COLUMN     "instalments" INTEGER NOT NULL,
ADD COLUMN     "priceInitial" TEXT NOT NULL,
ADD COLUMN     "priceWithDiscount" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "sex" TEXT NOT NULL,
ADD COLUMN     "stateProduct" TEXT,
ALTER COLUMN "discount" DROP NOT NULL;

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "Assessment" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "dateCommment" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assessment" ADD CONSTRAINT "Assessment_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
