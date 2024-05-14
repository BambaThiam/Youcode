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
import { redirect } from 'next/navigation';
import { z } from 'zod';

const page = async ({params} : {params: {courseId: string}}) => {
  const session = await getRequiredAuthSession();
  const course = await prisma.course.findUnique({
    where: {
      id: params.courseId,
      creatorId: session.user.id
    }
  })
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Edit Course</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
      <Card className="bg-background">
          <CardContent className="mt-6">
        <form action={async (formData) => {
          'use server';
          const userSession = await getRequiredAuthSession();
          await prisma.course.update({
            where: {
              id: params.courseId,
              creatorId: userSession.user.id
            },
            data: {
              name: formData.get('name') as string,
              image: formData.get('image') as string,
              presentation: formData.get('presentation') as string
            }
          })
        } }>
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
          <Button type="submit">Submit</Button>
        </form>
        </CardContent>
        </Card>
    </LayoutContent>
    </Layout>
  )
}

export default page