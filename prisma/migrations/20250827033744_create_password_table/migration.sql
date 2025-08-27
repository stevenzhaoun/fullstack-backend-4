-- CreateTable
CREATE TABLE "public"."Password" (
    "hash" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Password_user_id_key" ON "public"."Password"("user_id");

-- AddForeignKey
ALTER TABLE "public"."Password" ADD CONSTRAINT "Password_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
