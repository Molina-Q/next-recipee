"use client"
import { useSession } from 'next-auth/react'
import React from 'react'

const UserIcon = () => {
    const { data: session } = useSession()

    return (
        <>
            {session ? (
                <p>{session.user?.name}</p>
            ) : (
                <a href="/api/auth/sign-in">Sign-in</a>
            )}
        </>
    )
}

export default UserIcon