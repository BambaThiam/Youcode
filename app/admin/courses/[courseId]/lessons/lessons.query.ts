import prisma from "@/lib/prisma";

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
        lessons: true,
      }
    }
    
  )
  // return lessons
}