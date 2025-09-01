import { PrismaClient, Credential } from "@prisma/client";
const prisma = new PrismaClient();

type CreateData = {
  title: string;
  url?: string | null;
  username: string;
  passwordCipher: string;
  iv: string;
  tag: string;
};

export const credentialsRepository = {
  create(userId: number, data: CreateData): Promise<Credential> {
    return prisma.credential.create({ data: { ...data, userId } });
  },

  findAll(userId: number): Promise<Credential[]> {
    return prisma.credential.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  findById(id: number, userId: number): Promise<Credential | null> {
    return prisma.credential.findFirst({ where: { id, userId } });
  },

  // updateMany assegura escopo por usuário sem exigir índice único composto
  async update(
    id: number,
    userId: number,
    data: Partial<CreateData>
  ): Promise<Credential | null> {
    // Primeiro atualiza
    const result = await prisma.credential.updateMany({
      where: { id, userId },
      data,
    });

    // Se nada foi atualizado, retorna null
    if (result.count === 0) return null;

    // Retorna o registro atualizado
    return prisma.credential.findFirst({ where: { id, userId } });
  },

  async delete(id: number, userId: number): Promise<number> {
    const result = await prisma.credential.deleteMany({ where: { id, userId } });
    return result.count; // 0 = nada deletado, 1 = deletado
  },

  deleteAllFromUser(userId: number): Promise<{ count: number }> {
    return prisma.credential.deleteMany({ where: { userId } });
  },
};
