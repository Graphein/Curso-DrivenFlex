import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "demo@driven.com.br";
  const password = "demo123";

  const hash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {}, 
    create: {
      name: "Demo",
      email,
      password: hash,
    },
  });

  console.log("[seed] Usuário Demo garantido.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("[seed] Erro no seed:", e); 
    await prisma.$disconnect();
    process.exit(1); 
  });
