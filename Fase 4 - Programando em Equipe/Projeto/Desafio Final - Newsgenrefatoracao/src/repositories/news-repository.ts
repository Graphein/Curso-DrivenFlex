import prisma from "../database";

export type CreateNewsDTO = {
  title: string;
  text: string;
  author: string;
  publicationDate: string;
  firstHand?: boolean;
};

export type UpdateNewsDTO = Partial<CreateNewsDTO>;

export type FindManyParams = {
  skip: number;
  take: number;
  order: "asc" | "desc";
  title?: string;
};

function findMany({ skip, take, order, title }: FindManyParams) {
  return prisma.news.findMany({
    skip,
    take,
    orderBy: { publicationDate: order },
    where: title
      ? {
          title: {
            contains: title,
            mode: "insensitive",
          },
        }
      : undefined,
  });
}

function findById(id: number) {
  return prisma.news.findUnique({ where: { id } });
}

function findByTitle(title: string) {
  return prisma.news.findUnique({ where: { title } });
}

function create(data: CreateNewsDTO) {
  return prisma.news.create({
    data: {
      ...data,
      publicationDate: new Date(data.publicationDate),
    },
  });
}


function update(id: number, data: UpdateNewsDTO) {
  return prisma.news.update({
    where: { id },
    data: data.publicationDate
      ? { ...data, publicationDate: new Date(data.publicationDate) }
      : data,
  });
}

function remove(id: number) {
  return prisma.news.delete({ where: { id } });
}

export const newsRepository = {
  findMany,
  findById,
  findByTitle,
  create,
  update,
  remove,
};
