import { Music } from "../protocols";
import type { Request, Response } from 'express';

const musics: Music[] = [];

function getMusics() {
  return musics;
}

function createMusic(req: Request, res: Response) {
  const music = req.body as Music;
  musics.push(music)
  res.sendStatus(201);
}

const musicService = {
  getMusics,
  createMusic
}

export default musicService;

