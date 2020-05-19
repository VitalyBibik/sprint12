const Card = require('../models/cards');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => {
      if (cards.length === 0) {
        return res.status(404).send({ message: 'Cards list is empty' });
      }
      return res.send({ data: cards });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      const cardFind = card.find((item) => item.id === req.params.cardId);
      if (!cardFind) {
        return res.status(404).send({
          message: 'Card not found',
        });
      }
      return res.send({ data: cardFind });
    })
    .catch((err) => {
      if (err.name === err.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === err.CastError) {
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};
module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === err.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === err.CastError) {
        return res.status(400).send({ message: err.message });
      } return res.status(500).send({ message: err.message });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === err.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === err.CastError) {
        return res.status(400).send({ message: err.message });
      } return res.status(500).send({ message: err.message });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
        if (card.length === 0) {
            return res.status(404).send({ message: 'Like is empty' });
        }
        return res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === err.ValidationError) {
        return res.status(400).send({ message: err.message });
      }
      if (err.name === err.CastError) {
        return res.status(400).send({ message: err.message });
      } return res.status(500).send({ message: err.message });
    });
};
