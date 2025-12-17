import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import * as service from "../services/news-service";
import { CreateNewsDTO, UpdateNewsDTO } from "../repositories/news-repository";

export async function getNews(req: Request, res: Response, next: NextFunction) {
  try {
    const { page, order, title } = req.query;

    const news = await service.getNews({
      page: page ? Number(page) : undefined,
      order: order as string,
      title: title as string,
    });

    return res.status(httpStatus.OK).send(news);
  } catch (error) {
    next(error);
  }
}

export async function getNewsById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(httpStatus.BAD_REQUEST).send({
        error: "Id is not valid",
      });
    }

    const news = await service.getSpecificNews(id);
    return res.status(httpStatus.OK).send(news);
  } catch (error) {
    next(error);
  }
}

export async function createNews(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const newsData = req.body as CreateNewsDTO;

    const createdNews = await service.createNews(newsData);
    return res.status(httpStatus.CREATED).send(createdNews);
  } catch (error) {
    next(error);
  }
}

export async function updateNews(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(httpStatus.BAD_REQUEST).send({
        error: "Id is not valid",
      });
    }

    const newsData = req.body as UpdateNewsDTO;
    const updatedNews = await service.updateNews(id, newsData);

    return res.status(httpStatus.OK).send(updatedNews);
  } catch (error) {
    next(error);
  }
}

export async function deleteNews(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(httpStatus.BAD_REQUEST).send({
        error: "Id is not valid",
      });
    }

    await service.deleteNews(id);
    return res.sendStatus(httpStatus.NO_CONTENT);
  } catch (error) {
    next(error);
  }
}
