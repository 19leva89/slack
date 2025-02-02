import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Input,
	Separator,
} from '@/components/ui'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { FormEvent, useState } from 'react'
import { TriangleAlert } from 'lucide-react'
import { useAuthActions } from '@convex-dev/auth/react'

import { SignInFlow } from '@/features/auth/types'

interface SignInCardProps {
	setState: (state: SignInFlow) => void
}

export const SignInCard = ({ setState }: SignInCardProps) => {
	const { signIn } = useAuthActions()

	const [error, setError] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [pending, setPending] = useState(false)

	const onPasswordSignIn = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		setPending(true)

		signIn('password', { email, password, flow: 'signIn' })
			.catch(() => setError('Invalid email or password'))
			.finally(() => setPending(false))
	}

	const onProviderSignIn = (value: 'github' | 'google') => {
		setPending(true)

		signIn(value).finally(() => setPending(false))
	}

	return (
		<Card className="w-full h-full p-8">
			<CardHeader className="px-0 pt-0">
				<CardTitle>Login to continue</CardTitle>

				<CardDescription>Use your email or another service to continue</CardDescription>
			</CardHeader>

			{!!error && (
				<div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
					<TriangleAlert className="size-4" />

					<p>{error}</p>
				</div>
			)}

			<CardContent className="space-y-5 px-0 pb-0">
				<form onSubmit={onPasswordSignIn} className="space-y-2.5">
					<Input
						type="email"
						placeholder="Email"
						disabled={pending}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>

					<Input
						type="password"
						placeholder="Password"
						disabled={pending}
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>

					<Button type="submit" size="lg" disabled={pending} className="w-full">
						Continue
					</Button>
				</form>

				<Separator />

				<div className="flex flex-col gap-y-2.5">
					<Button
						type="button"
						size="lg"
						variant="outline"
						disabled={pending}
						onClick={() => onProviderSignIn('google')}
						className="w-full relative"
					>
						<FcGoogle className="!size-5 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
						Continue with Google
					</Button>

					<Button
						type="button"
						size="lg"
						variant="outline"
						disabled={pending}
						onClick={() => onProviderSignIn('github')}
						className="w-full relative"
					>
						<FaGithub className="!size-5 absolute left-2.5 top-1/2 transform -translate-y-1/2" />
						Continue with GitHub
					</Button>
				</div>

				<p className="text-xs text-muted-foreground">
					Don&apos;t have an account?{' '}
					<span onClick={() => setState('signUp')} className="text-sky-700 hover:underline cursor-pointer">
						Sign up
					</span>
				</p>
			</CardContent>
		</Card>
	)
}
