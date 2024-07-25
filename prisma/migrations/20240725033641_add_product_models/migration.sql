-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageCover" TEXT NOT NULL,
    "stars" INTEGER NOT NULL,
    "valueOfficial" TEXT NOT NULL,
    "valueInitial" TEXT NOT NULL,
    "discount" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "for" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "size" TEXT,
    "comments" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodToKnow" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "GoodToKnow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodToKnow" ADD CONSTRAINT "GoodToKnow_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
