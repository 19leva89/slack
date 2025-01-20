'use client'

import { useAuthActions } from '@convex-dev/auth/react'

import { Button } from '@/components/ui'

const HomePage = () => {
	const { signOut } = useAuthActions()

	return (
		<div>
			Logged in
			<Button onClick={() => signOut()}>Sign out</Button>
		</div>
	)
}

export default HomePage
