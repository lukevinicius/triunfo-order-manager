import { prisma } from '@/lib/prisma'

interface IRequest {
  userId: string
}

interface IResponse {
  user?: {
    id: string
    name: string
    username: string
    email: string
  }
  error?: {
    message: string
  }
}

export async function getUserById({ userId }: IRequest): Promise<IResponse> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
    },
  })

  if (!user) {
    return {
      error: {
        message: 'Admin não encontrado',
      },
    }
  }

  const response = {
    user: {
      id: user.id,
      name: user.name,
      username: user.username || '',
      email: user.email,
    },
  }

  return response
}
