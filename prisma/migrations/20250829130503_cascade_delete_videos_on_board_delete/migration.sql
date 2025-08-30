-- DropForeignKey
ALTER TABLE "public"."Video" DROP CONSTRAINT "Video_boardId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Video" ADD CONSTRAINT "Video_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "public"."Board"("id") ON DELETE CASCADE ON UPDATE CASCADE;
