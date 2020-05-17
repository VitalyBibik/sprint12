const Card = require('../models/cards');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(400).send({ message: 'Card not found' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
      .then((card) => {
        const cardFind = card.find((item) => item.id === req.params.cardId);
        if (!cardFind){
          return res.status(404).send({
            message:"Card not found"
          })
        }
        res.send({data: cardFind});
      })
      .catch((err) => {
        if (err.name === err.ValidationError) {
          res.status(400).send({message: err.message});
        }
        if (err.name === err.CastError){
          res.status(400).send({message: err.message});
        }
        else {
          res.status(500).send({message: err.message});
        }
      });

};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
);

module.exports.dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
);
