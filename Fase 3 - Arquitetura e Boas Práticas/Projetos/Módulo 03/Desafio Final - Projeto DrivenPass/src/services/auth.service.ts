import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/user.repository";
import { env } from "../config/database";
import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import UnauthorizedError from "../errors/UnauthorizedError";

export const authService = {
  async signUp(name: string, email: string, password: string) {
    const exists = await userRepository.findByEmail(email);
    if (exists) {
      throw new ConflictError("E-mail já está cadastrado");
    }

    const hash = await bcrypt.hash(password, 10);
    await userRepository.create({ name, email, password: hash });
  },

  async signIn(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundError("E-mail não encontrado");
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      throw new UnauthorizedError("Credenciais inválidas");
    }

    const token = jwt.sign({ userId: user.id }, env.JWT_SECRET, { expiresIn: "7d" });
    return token;
  }
};
