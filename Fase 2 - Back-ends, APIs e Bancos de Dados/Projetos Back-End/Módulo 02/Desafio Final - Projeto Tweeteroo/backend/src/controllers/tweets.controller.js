import db from '../database/mongoClient.js';
import { ObjectId } from 'mongodb';

export async function postTweet(req, res) {
  const { username, tweet } = req.body;

  try {
    const userExists = await db.collection('users').findOne({ username });
    if (!userExists) return res.sendStatus(401);

    await db.collection('tweets').insertOne({ username, tweet });
    res.sendStatus(201);
  } catch (err) {
    res.status(500).send('Erro ao publicar tweet');
  }
}

export async function getTweets(req, res) {
  try {
    const tweets = await db.collection('tweets')
      .find()
      .sort({ _id: -1 }) // mais recentes primeiro
      .toArray();

    const usernames = [...new Set(tweets.map(t => t.username))];
    const users = await db.collection('users')
      .find({ username: { $in: usernames } })
      .toArray();

    const userMap = {};
    users.forEach(u => userMap[u.username] = u.avatar);

    const enrichedTweets = tweets.map(t => ({
      _id: t._id,
      username: t.username,
      avatar: userMap[t.username] || '',
      tweet: t.tweet
    }));

    res.send(enrichedTweets);
  } catch (err) {
    res.status(500).send('Erro ao buscar tweets');
  }
}
export async function updateTweet(req, res) {
  const { id } = req.params;
  const { username, tweet } = req.body;

  try {
    const tweetExists = await db.collection('tweets').findOne({ _id: new ObjectId(id) });
    if (!tweetExists) return res.sendStatus(404);

    const userExists = await db.collection('users').findOne({ username });
    if (!userExists) return res.sendStatus(401);

    await db.collection('tweets').updateOne(
      { _id: new ObjectId(id) },
      { $set: { username, tweet } }
    );

    res.sendStatus(204); // No Content
  } catch (err) {
    res.status(500).send('Erro ao atualizar tweet');
  }
}
export async function deleteTweet(req, res) {
  const { id } = req.params;

  try {
    const tweetExists = await db.collection('tweets').findOne({ _id: new ObjectId(id) });
    if (!tweetExists) return res.sendStatus(404);

    await db.collection('tweets').deleteOne({ _id: new ObjectId(id) });

    res.sendStatus(204); // No Content
  } catch (err) {
    res.status(500).send('Erro ao deletar tweet');
  }
}