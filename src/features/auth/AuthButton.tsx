
import LoginButton from './LoginButton'
import LoggedInButton from './LoggedInButton'
import { getAuthSession } from '@/lib/auth'

export type AuthButtonProps = {}

const AuthButton = async (props: AuthButtonProps) => {
  const session = await getAuthSession()
  const user = session?.user
  
  if(!user) {
    return <LoginButton />
  }

  return <LoggedInButton user={user} />

}

export default AuthButton