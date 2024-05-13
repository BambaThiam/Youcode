/* eslint-disable @next/next/no-img-element */
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRequiredAuthSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { getCourseLessons } from './lessons.query';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Typography } from '@/components/ui/Typography'
import { AdminLessonItem } from './AdminLessonItem';

const CourseLessonsPage = async ({params}: {params: {courseId: string}}) => {
  const session = await getRequiredAuthSession()
  const course = await getCourseLessons( {
    courseId: params.courseId,
    userId: session.user.id
  })

  if (!course) {
    return notFound()
  }
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Courses . {course.name} </LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4 lg:flex-row">
        <Card className="flex-[2]">
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            {course.lessons.map((lesson) => (
              <Link href={`/admin/courses/${params.courseId}/lessons/${lesson.id}`}>
                <div className="flex items-center gap-4 p-4 hover:bg-gray-100 active:bg-gray-200">
                  <Avatar className="rounded">
                    <AvatarFallback>{lesson.name?.[0]}</AvatarFallback>
                    {lesson.rank && (
                      <AvatarImage src={lesson.rank} alt={lesson.name ?? ""} />
                    )}
                  </Avatar>

                      {/* {lesson.name} */}
                      <AdminLessonItem key={lesson.id} lesson={lesson} />
                </div>
              </Link>
            ))}
            {/* {course.lessons.map((lesson) => (
              <LessonItem key={lesson.id} lesson={lesson} />
            ))} */}
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  )
}

export default CourseLessonsPage