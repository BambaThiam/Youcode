import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import { getCourses } from '../admin/courses/course.query';
import { CourseCard } from '../admin/courses/CourseCard';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Typography } from '@/components/ui/Typography';


const ExplorerPage = async () => {
  const courses = await getCourses();

  return (
    <Layout>
    <LayoutHeader>
      <LayoutTitle>Explorer</LayoutTitle>
    </LayoutHeader>
    <LayoutContent className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
      {courses.map((course) => (
        <CourseCard course={course} key={course.id} />
      ))}
    </LayoutContent>
  </Layout>
  )
}

export default ExplorerPage