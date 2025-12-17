import { faker } from "@faker-js/faker";
import { CreateNewsData } from "../../src/repositories/news-repository";
import prisma from "../../src/database";

export function generateRandomNews(firstHand = false): CreateNewsData {
  return {
    author: faker.person.fullName(),
    firstHand,
    text: faker.lorem.paragraphs(5),
    publicationDate: faker.date.future(),
    title: faker.lorem.words(7)
  }
}

export async function persistNewRandomNews(firstHand = false) {
  return await prisma.news.create({
    data: generateRandomNews(firstHand)
  });
}

export async function persistNewRandomNewsInThePast(firstHand = false) {
  const eventData = generateRandomNews(firstHand);
  eventData.publicationDate = faker.date.past();

  return await prisma.news.create({
    data: eventData
  });
}