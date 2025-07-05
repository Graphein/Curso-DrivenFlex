const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const validateTransaction = require('../middleware/validateSchema');
const jwt = require('jsonwebtoken'); // Adicione esta linha se estiver faltando

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('Header recebido:', authHeader);
  const token = authHeader?.split(' ')[1];
  console.log('Token extraído:', token);
  if (!token) return res.status(401).send('No token provided');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado:', decoded);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log('Erro na verificação:', error.message);
    res.status(401).send('Invalid token');
  }
};

router.post('/', authMiddleware, validateTransaction, transactionController.addTransaction);
router.get('/', authMiddleware, transactionController.getTransactions);
router.put('/:id', authMiddleware, validateTransaction, transactionController.editTransaction);
router.delete('/:id', authMiddleware, transactionController.deleteTransaction);

module.exports = router;