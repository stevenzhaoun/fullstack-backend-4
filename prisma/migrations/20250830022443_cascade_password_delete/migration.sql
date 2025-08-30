-- DropForeignKey
ALTER TABLE "public"."Password" DROP CONSTRAINT "Password_user_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."Password" ADD CONSTRAINT "Password_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
