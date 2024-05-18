import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from '@/components/layout/layout';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Typography } from '@/components/ui/Typography';
import { getRequiredAuthSession } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { notFound, redirect } from 'next/navigation';
import { z } from 'zod';
import { CourseFormSchema } from './course.schema';
import { SubmitButton } from '@/components/form/SubmitButton';


const page = async ({params} : {params: {courseId: string}}) => {
  const session = await getRequiredAuthSession();
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      creatorId: session.user.id
    },
    select: {
      id: true,
      image: true,
      name: true,
      presentation: true
    }
  })

  if(!course) {
    notFound()
  }
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Edit Course</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
      <Card className="bg-background">
          <CardContent className="mt-6">
        <form action= { async (formData: FormData ) => {
          "use server"
          const userSession = await getRequiredAuthSession();

          const image = formData.get('image');
          const name = formData.get('name');
          const presentation = formData.get('presentation');
        
          const safeData = CourseFormSchema.safeParse({
            image,
            name,
            presentation
          });
         
          if (!safeData.success) {
            const searchParams = new URLSearchParams();
            searchParams.set(
              'error',
              'Invalid data. Image must be an URL and name must be between 3 and 40 characters.'
            );
            redirect(`/admin/courses/${params.courseId}/edit?${searchParams.toString()}`);
          }
        
           await prisma.course.update({
            where: {
              id: params.courseId,
              creatorId: userSession.user.id
        
            },
            data: safeData.data
          })

          revalidatePath(`/admin/courses/${params.courseId}/edit`)
          redirect(`/admin/courses/${params.courseId}`)

         
         }}>
          <div className="flex flex-col gap-1 mb-4">
            <Label htmlFor="image">Image URL</Label>
            <Input defaultValue={course?.image} name="image" id="image" />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <Label htmlFor="name">Name</Label>
            <Input defaultValue={course?.name} name="name" id="name" />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <Label htmlFor="presentation">Presentation</Label>
            <Input defaultValue={course?.presentation} name="presentation" id="presentation" />
          </div>
          <div className="flex flex-col gap-1 mb-4">
            <Label htmlFor="state">State</Label>
            {/* <Input type='' defaultValue="" name="state" id="state" /> */}
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="STATE" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <SubmitButton type="submit">Submit</SubmitButton>
        </form>
        </CardContent>
        </Card>
    </LayoutContent>
    </Layout>
  )
}

export default page

