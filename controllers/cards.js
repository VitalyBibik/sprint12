const Card = require('../models/cards');

module.exports.getCards = (req, res) => {
    Card.find({})
        .populate('owner')
        .then(cards => res.send({ data: cards }))
        .catch(err => res.status(500).send({ message: err.message }));
};

module.exports.deleteCard = (req, res) => {
    console.log('cardDe',req.params.id);
    Card.findByIdAndRemove(req.params.id)
        .then((card) => res.send({ data: card }))
        .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createCard = (req, res) => {
    console.log(req.body);
    const { name, link } = req.body;

    Card.create({ name, link })
        .then(card => res.send({ data: card }))
        .catch(err => res.status(500).send({ message: err.message }));
};
