
import supertest from "supertest";
import app from "../src/app";
import prisma from "../src/database";
import { faker } from '@faker-js/faker';
import httpStatus from "http-status";

import { generateRandomNews, persistNewRandomNews } from "./factories/news-factory";

const api = supertest(app);

beforeEach(async () => {
  await prisma.news.deleteMany();
});

describe("GET /news", () => {
  it("should get all news registered", async () => {
    await persistNewRandomNews();
    await persistNewRandomNews();
    await persistNewRandomNews();

    const result = await api.get("/news");
    const news = result.body;
    expect(news).toHaveLength(3);
    expect(news).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        author: expect.any(String),
        firstHand: expect.any(Boolean),
        publicationDate: expect.any(String),
        title: expect.any(String),
        text: expect.any(String)
      })
    ]))
  });

  it("should get a specific id by id", async () => {
    const news = await persistNewRandomNews();
    const { status, body } = await api.get(`/news/${news.id}`);
    expect(status).toBe(httpStatus.OK);
    expect(body).toMatchObject({
      id: news.id
    });
  });

  it("should return 404 when id is not found", async () => {
    const { status } = await api.get(`/news/1`);
    expect(status).toBe(httpStatus.NOT_FOUND);
  });

  it("should return 400 when id is not valid", async () => {
    const { status } = await api.get(`/news/0`);
    expect(status).toBe(httpStatus.BAD_REQUEST);
  });

});

describe("POST /news", () => {
  it("should create news", async () => {
    const newsBody = generateRandomNews();

    const { body, status } = await api.post("/news").send(newsBody);
    expect(status).toBe(httpStatus.CREATED);
    expect(body).toMatchObject({
      id: expect.any(Number),
      text: newsBody.text
    });

    const news = await prisma.news.findUnique({
      where: {
        id: body.id
      }
    });

    expect(news).not.toBeNull();
  });

  it("should return 422 when body is not valid", async () => {
    const { status } = await api.post("/news").send({});
    expect(status).toBe(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should return 409 when title already exist", async () => {
    const news = await persistNewRandomNews();
    const newsBody = { ...generateRandomNews(), title: news.title };
    const { status } = await api.post("/news").send(newsBody);
    expect(status).toBe(httpStatus.CONFLICT);
  });

  it("should return 400 when text is less than 500 chars", async () => {
    const newsBody = generateRandomNews();
    newsBody.text = "short";

    const { status } = await api.post("/news").send(newsBody);
    expect(status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return 400 when publication date is in the past", async () => {
    const newsBody = generateRandomNews();
    newsBody.publicationDate = faker.date.past({ years: 1 });

    const { status } = await api.post("/news").send(newsBody);
    expect(status).toBe(httpStatus.BAD_REQUEST);
  });

});

describe("DELETE /news", () => {
  it("should delete a news", async () => {
    const { id: newsId } = await persistNewRandomNews();
    const { status } = await api.delete(`/news/${newsId}`);

    expect(status).toBe(httpStatus.NO_CONTENT);

    const news = await prisma.news.findUnique({
      where: {
        id: newsId
      }
    });

    expect(news).toBeNull();
  });

  it("should return 404 when id is not found", async () => {
    const { status } = await api.delete(`/news/1`);
    expect(status).toBe(httpStatus.NOT_FOUND);
  });

  it("should return 400 when id is not valid", async () => {
    const { status } = await api.delete(`/news/0`);
    expect(status).toBe(httpStatus.BAD_REQUEST);
  });

});

describe("PUT /news", () => {
  it("should update a news", async () => {
    const { id: newsId } = await persistNewRandomNews();
    const newsData = generateRandomNews();

    const { status } = await api.put(`/news/${newsId}`).send(newsData);
    expect(status).toBe(httpStatus.OK);

    const news = await prisma.news.findUnique({
      where: {
        id: newsId
      }
    });

    expect(news).toMatchObject({
      text: newsData.text,
      title: newsData.title
    });
  });

  it("should return 404 when id is not found", async () => {
    const newsData = generateRandomNews();

    const { status } = await api.put(`/news/1`).send(newsData);
    expect(status).toBe(httpStatus.NOT_FOUND);
  });

  it("should return 400 when id is not valid", async () => {
    const { status } = await api.delete(`/news/0`);
    expect(status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return 409 when title already exist", async () => {
    const news = await persistNewRandomNews();
    const news2 = await persistNewRandomNews();

    const newsBody = { ...generateRandomNews(), title: news2.title };
    const { status } = await api.put(`/news/${news.id}`).send(newsBody);
    expect(status).toBe(httpStatus.CONFLICT);
  });

  it("should return 400 when text is less than 500 chars", async () => {
    const news = await persistNewRandomNews();
    const newsBody = generateRandomNews();
    newsBody.text = "short";

    const { status } = await api.put(`/news/${news.id}`).send(newsBody);
    expect(status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should return 400 when publication date is in the past", async () => {
    const news = await persistNewRandomNews();
    const newsBody = generateRandomNews();
    newsBody.publicationDate = faker.date.past({ years: 1 });

    const { status } = await api.put(`/news/${news.id}`).send(newsBody);
    expect(status).toBe(httpStatus.BAD_REQUEST);
  });


});