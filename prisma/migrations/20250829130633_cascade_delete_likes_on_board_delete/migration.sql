-- DropForeignKey
ALTER TABLE "public"."Like" DROP CONSTRAINT "Like_boardId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Like" ADD CONSTRAINT "Like_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "public"."Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
