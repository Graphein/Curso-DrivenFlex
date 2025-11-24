import prisma from "../database";

export async function findMiles(code: string) {
  return await prisma.miles.findUnique({
    where: { code }
  })
}

export async function saveMiles(code: string, miles: number) {
  return await prisma.miles.create({
    data: {
      code,
      miles
    }
  })
}