import prisma from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export const getMyCourses = async (
  {userId}: {userId: string}
) => {
  return await prisma.course.findMany(
    {
      where: {
        users: {
          some: {
            userId
          }
        }
      },
      select: {
        id: true,
        name: true,
        image: true,
        users: true
      }
    }
  )
}

export type MyCoursesCard = Prisma.PromiseReturnType<typeof getMyCourses>[number]