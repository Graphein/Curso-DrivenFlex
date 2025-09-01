import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const userRepository = {
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },
  create(data: { name: string; email: string; password: string }) {
    return prisma.user.create({ data });
  },
  deleteById(id: number) {
    return prisma.user.delete({ where: { id } });
  }
};