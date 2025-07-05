import { Router } from 'express';
import {
  postTweet,
  getTweets,
  updateTweet,
  deleteTweet
} from '../controllers/tweets.controller.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { tweetSchema } from '../schemas/tweet.schema.js';

const router = Router();

router.post('/', validateSchema(tweetSchema), postTweet);
router.get('/', getTweets);
router.put('/:id', validateSchema(tweetSchema), updateTweet);
router.delete('/:id', deleteTweet);

export default router;