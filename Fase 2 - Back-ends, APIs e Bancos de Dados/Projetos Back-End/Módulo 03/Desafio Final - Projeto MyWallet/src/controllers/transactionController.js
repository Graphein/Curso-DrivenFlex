const Transaction = require('../schemas/transactionSchema');

exports.addTransaction = async (req, res) => {
  try {
    const { value, description, type } = req.body;
    const transaction = await Transaction.create({ userId: req.userId, value, description, type });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const transactions = await Transaction.find({ userId: req.userId })
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.editTransaction = async (req, res) => {
  try {
    const { value, description, type } = req.body;
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { value, description, type },
      { new: true }
    );
    if (!transaction) return res.status(401).send();
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    console.log('ID recebido:', req.params.id); 
    console.log('UserId do token:', req.userId); 
    const transaction = await Transaction.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    console.log('Transação removida:', transaction); 
    if (!transaction) return res.status(401).send('Unauthorized'); 
    res.status(204).send();
  } catch (error) {
    console.log('Erro na remoção:', error.message);
    res.status(400).json({ error: error.message }); 
  }
};