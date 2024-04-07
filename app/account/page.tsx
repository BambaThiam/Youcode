import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getAuthSession } from '@/lib/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import React from 'react'
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import LogoutButton from '@/features/auth/LogoutButton';

const AccountPage = async () => {
  const session = await getAuthSession()

  if (!session) {
    throw new Error('No session found')
  }

  return (
    <Card className="w-auto max-w-lg mt-4">
      <CardHeader className="flex flex-row gap-4 space-y-0">
      <Avatar>
        <AvatarFallback>{session.user.email?.[0]}</AvatarFallback>
        {session.user.image && (
          <AvatarImage src={session.user.image} alt={session.user.name ?? 'user picture'} />
        )}
      </Avatar>
      <div className="flex flex-col gap-1">
          <CardTitle>{session.user.email}</CardTitle>
          <CardDescription>{session.user.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Link
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
          href="/account/settings"
        >
          Settings
        </Link>
        <Link
          className={buttonVariants({ variant: 'outline', size: 'lg' })}
          href="/admin"
        >
          Admin
        </Link>
      </CardContent>
      <CardFooter className="flex flex-row-reverse">
        <LogoutButton />
      </CardFooter>
    </Card>
  )
}

export default AccountPage