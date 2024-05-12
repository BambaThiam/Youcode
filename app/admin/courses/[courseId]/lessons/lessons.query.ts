import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export const getCourseLessons = async (
  {
  courseId,
  userId
}: {
  courseId: string;
  userId: string;}
) => {

  // const lessons = await prisma.lesson.findMany(
  //   {
  //     where: {
  //       courseId : courseId,
  //       course: {
  //         creatorId: userId
  //       }
  //     },
  //     select: {
  //       id: true,
  //       name: true,
  //       content: true,
  //       state: true,
  //     }
  //   }
  // const lessons = await prisma.course.findFirst(
  return await prisma.course.findFirst(
    {
      where: {
        id: courseId,
        creatorId: userId
      },
      select: {
        id: true,
        name: true,
        lessons: {
          orderBy: {
            rank: 'asc',
          },
          select: {
            id: true,
            name: true,
            content: true,
            state: true,
            courseId: true,
            rank: true,
          }
        }
      }
    }
    
  )
  // return lessons
}

export type AdminLessonItemType = NonNullable<
  Prisma.PromiseReturnType<typeof getCourseLessons>
>['lessons'][number];