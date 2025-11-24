import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function resetDatabase() {
  await prisma.$executeRawUnsafe(`
    DO
    $func$
    BEGIN
      EXECUTE (
        SELECT 'TRUNCATE TABLE ' || string_agg(format('%I.%I', schemaname, tablename), ', ')
               || ' RESTART IDENTITY CASCADE'
        FROM   pg_tables
        WHERE  schemaname = 'public'
        AND    tablename <> '_prisma_migrations'
      );
    END
    $func$;
  `);
}

export async function disconnect() {
  await prisma.$disconnect();
}
