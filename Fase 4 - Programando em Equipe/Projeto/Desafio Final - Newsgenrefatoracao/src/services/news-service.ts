import { newsRepository } from "../repositories/news-repository";
import { AppError } from "../middlewares/error-handler";

const DEFAULT_PAGE_SIZE = 10;

export async function getNews(params: {
  page?: number;
  order?: string;
  title?: string;
}) {
  const page = params.page && params.page > 0 ? params.page : 1;
  const order = params.order === "asc" ? "asc" : "desc";
  const title = params.title?.trim() || undefined;

  const skip = (page - 1) * DEFAULT_PAGE_SIZE;
  const take = DEFAULT_PAGE_SIZE;

  return newsRepository.findMany({ skip, take, order, title });
}

export async function getSpecificNews(id: number) {
  const news = await newsRepository.findById(id);
  if (!news) {
    throw new AppError(404, `News with id ${id} not found`);
  }
  return news;
}

export async function createNews(data: any) {
  await validateTitle(data.title);
  validateTextLength(data.text);
  validatePublicationDate(data.publicationDate);

  return newsRepository.create(data);
}

export async function updateNews(id: number, data: any) {
  const existing = await getSpecificNews(id);

  if (data.title && data.title !== existing.title) {
    await validateTitle(data.title);
  }

  if (data.text) {
    validateTextLength(data.text);
  }

  if (data.publicationDate) {
    validatePublicationDate(data.publicationDate);
  }

  return newsRepository.update(id, data);
}

export async function deleteNews(id: number) {
  await getSpecificNews(id);
  return newsRepository.remove(id);
}

// ===== VALIDAÇÕES =====

async function validateTitle(title: string) {
  const newsWithSameTitle = await newsRepository.findByTitle(title);
  if (newsWithSameTitle) {
    throw new AppError(409, `Title "${title}" already exists`);
  }
}

function validateTextLength(text: string) {
  if (text.length < 500) {
    throw new AppError(400, "News text must have at least 500 characters");
  }
}

function validatePublicationDate(date: string | Date) {
  const publicationDate = new Date(date);
  const now = new Date();

  if (publicationDate.getTime() < now.getTime()) {
    throw new AppError(400, "Publication date cannot be in the past");
  }
}
