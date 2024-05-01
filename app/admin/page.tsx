import { Layout, LayoutContent, LayoutHeader, LayoutTitle } from '@/components/layout/layout'
import { Typography } from '@/components/ui/Typography'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {getRequiredAuthSession } from '@/lib/auth'
import prisma from '@/lib/prisma'
import Link from 'next/link'

import React from 'react'

const AdminPage = async () => {
  
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>
          Courses
          </LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Link href="/admin/courses">Courses</Link>
      </LayoutContent>
    </Layout>
  )
}

export default AdminPage