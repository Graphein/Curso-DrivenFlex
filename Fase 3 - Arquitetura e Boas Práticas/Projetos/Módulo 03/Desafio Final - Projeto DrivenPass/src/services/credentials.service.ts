import { Credential } from "@prisma/client";
import { credentialsRepository } from "../repositories/credentials.repository";
import { encrypt, decrypt } from "../utils/crypto";
import NotFoundError from "../errors/NotFoundError";
import ConflictError from "../errors/ConflictError";
import { userRepository } from "../repositories/user.repository";

export const credentialsService = {
  async create(userId: number, data: { title: string; url?: string | null; username: string; password: string; }) {
    const enc = encrypt(data.password);
    try {
      return await credentialsRepository.create(userId, {
        title: data.title,
        url: data.url ?? null,
        username: data.username,
        passwordCipher: enc.cipherText,
        iv: enc.iv,
        tag: enc.tag,
      });
    } catch (err: any) {
      if (err?.code === "P2002") throw new ConflictError("Já existe uma credencial com esse título para este usuário");
      throw err;
    }
  },

  async list(userId: number) {
    const list: Credential[] = await credentialsRepository.findAll(userId);
    return list.map((c: Credential) => ({
      id: c.id,
      title: c.title,
      url: c.url,
      username: c.username,
      password: decrypt(c.passwordCipher, c.iv, c.tag),
      createdAt: c.createdAt,
    }));
  },

  async getById(userId: number, id: number) {
    const c = await credentialsRepository.findById(id, userId);
    if (!c) throw new NotFoundError("Credencial não encontrada");
    return {
      id: c.id,
      title: c.title,
      url: c.url,
      username: c.username,
      password: decrypt(c.passwordCipher, c.iv, c.tag),
      createdAt: c.createdAt,
    };
  },

  async update(userId: number, id: number, data: { title?: string; url?: string | null; username?: string; password?: string; }) {
    const existing = await credentialsRepository.findById(id, userId);
    if (!existing) throw new NotFoundError("Credencial não encontrada");

    const patch: any = { ...data };
    if (data.password) {
      const enc = encrypt(data.password);
      patch.passwordCipher = enc.cipherText;
      patch.iv = enc.iv;
      patch.tag = enc.tag;
      delete patch.password;
    }

    try {
      return await credentialsRepository.update(id, userId, patch);
    } catch (err: any) {
      if (err?.code === "P2002") throw new ConflictError("Já existe uma credencial com esse título para este usuário");
      throw err;
    }
  },

  async eraseAll(userId: number) {
    await credentialsRepository.deleteAllFromUser(userId);
    await userRepository.deleteById(userId);
  },

  async remove(userId: number, id: number) {
    const existing = await credentialsRepository.findById(id, userId);
    if (!existing) throw new NotFoundError("Credencial não encontrada");
    await credentialsRepository.delete(id, userId);
  },
};
