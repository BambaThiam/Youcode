import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';

import { CourseCard } from './CourseCard';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Typography } from '@/components/ui/Typography';
import { getAuthSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { NotAuthenticatedCard } from '@/components/features/errors/NotAuthentificatedCard';
import { getCourses } from './courses.query';


const CoursesPage = async () => {
  const session = await getAuthSession()
  if (!session?.user.id) {
    return <NotAuthenticatedCard />;
  }
  const courses = await getCourses(session.user.id);

  return (
    <Layout>
    <LayoutHeader>
      <LayoutTitle>Mes cours</LayoutTitle>
    </LayoutHeader>
    <LayoutContent className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {courses.map((course) => (
        <CourseCard course={course} key={course.id} />
      ))}
    </LayoutContent>
  </Layout>
  )
}

export default CoursesPage