export const env = {
    PORT: Number(process.env.PORT ?? 5000),
    JWT_SECRET: process.env.JWT_SECRET as string,
    AES_SECRET: process.env.AES_SECRET as string
  };