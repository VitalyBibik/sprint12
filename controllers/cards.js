const Card = require('../models/cards');

module.exports.getCards = (req, res) => {
    Card.find({})
        .populate('owner')
        .then(cards => res.send({ data: cards }))
        .catch(err => res.status(400).send({ message: "Card not found" }));
};

module.exports.deleteCard = (req, res) => {
    Card.findByIdAndRemove(req.params.cardId)
        .then((card) => {
            const cardFind = card.find(item => item.id === req.params.cardId);
            res.send({ data: cardFind})})
        .catch((err, cardFind) => {
            if (err.name === err.ValidationError) {
                res.status(400).send({message: err.message})
            } else {
                if(!cardFind && cardFind === undefined)  {
                    console.log(cardFind,'!s')
                    return res.status(400).send({error:"Нет такой карточки"})
                }
                else{
                res.status(500).send({message: err.message}) }
            }
        })
};

module.exports.createCard = (req, res) => {
    const { name, link } = req.body;
    Card.create({ name, link, owner: req.user._id })
        .then((card) => res.send({ data: card }))
        .catch((err) => res.status(500).send({ message: err.message }));
};
