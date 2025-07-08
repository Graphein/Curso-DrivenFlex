import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import joi from 'joi';

const productsSchema = joi.object({
  name: joi.string().required(),
  sku: joi.number().integer().required(),
  price: joi.number().integer().required()
})
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;
mongoClient.connect(() => {
  db = mongoClient.db("my_store_ultra_system_incremented");
});

const app = express();
app.use(express.json());

/* Products Routes */
app.post('/products', async (req, res) => {
  const product = req.body;

  const validate = productsSchema.validate(req.body, { abortEarly: false })
  if (validate.error) return res.sendStatus(422)

  try {
    await db.collection('products').insertOne(product)
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
})
app.get('/products/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const product = await db.collection('products').findOne({ _id: new ObjectId(id) })
    if (!product) {
      return res.sendStatus(404);
    }

    res.send(product);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});


app.post('/products', async (req, res) => {
  const product = req.body;

  try {
    await db.collection('products').insertOne(product)
    res.sendStatus(201);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

app.delete('/products/:id', async (req, res) => {
  const id = req.params.id;

  try {
    await db.collection('products').deleteOne({ _id: new ObjectId(id) })

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

/* Customers Routes */
app.post('/customers', async (req, res) => {
  try {
    const customer = req.body;

    const customerSchema = joi.object({
      name: joi.string().required(),
      email: joi.string().required().email()
    })
  
    const validate = customerSchema.validate(req.body, { abortEarly: false })
    if (validate.error) return res.sendStatus(422)

    await db.collection('customers').insertOne(customer);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})

app.get('/customers/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const customer = await db.collection('customers').findOne({ _id: new ObjectId(id) });

    if (!customer) {
      return res.sendStatus(404);
    }

    res.send(customer);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.post('/customers', async (req, res) => {
  try {
    const customer = req.body;

    await db.collection('customers').insertOne(customer);

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});


app.delete('/customers/:id', async (req, res) => {
  try {
    const id = req.params.id;

    await db.collection('customers').deleteOne({ _id: new ObjectId(id) });

    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.listen(5000, () => {
  console.log('Server is litening on port 5000.');
});
