import { Request, Response } from "express";
import musicService from "../services/music-service";

function getMusics(req: Request, res: Response) {
  const musics = musicService.getMusics();
  res.send(musics);
}

function createMusic(req: Request, res: Response) {
  const music = req.body; // TODO Asserção do tipo
  res.sendStatus(201);
}

const musicController = {
  getMusics,
  createMusic
}

export default musicController;