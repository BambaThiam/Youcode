"use client"

import { Button } from '@/components/ui/button'
import Loader from '@/components/ui/loader'
import { useMutation } from '@tanstack/react-query'
import { LogIn, LogOut } from 'lucide-react'
import {signOut } from 'next-auth/react'


const LogoutButton = () => {
  const mutation = useMutation(
    {
      mutationFn: async () => signOut,
    }

  )
  return (
    <Button variant='outline' size="sm" onClick={()=> mutation.mutate()}>
      {mutation.isPending ? <Loader size={12}/> : <LogOut className="mr-2" size={12}/>}
      Logout
    </Button>
  )
}

export default LogoutButton