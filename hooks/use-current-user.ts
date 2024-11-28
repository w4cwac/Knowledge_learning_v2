
import {useSession} from 'next-auth/react'

export const useCurentUser = () =>{
    const session = useSession()

    return session.data?.user
}

