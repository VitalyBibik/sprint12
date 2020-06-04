const Card = require('../models/cards');
const NotFoundError = require('../errors/NotFoundError');
const AccecDeniedError = require('../errors/AccecDeniedError');

module.exports.getCards = async (req, res) => {
  try {
    const userGetCards = await Card.find({}).populate('owner')
      .orFail(() => new NotFoundError('Card list is empty'));
    return res.send(userGetCards);
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({
      message: statusCode === 500 ? 'Произошла ошибка' : err.message,
    });
  }
};
module.exports.deleteCard = async (req, res) => {
  const { cardId } = req.params;
  try {
    const userDeleteCard = await Card.findById(cardId).populate('owner')
      .orFail(() => new NotFoundError('Card list is empty'));
    if (userDeleteCard.owner.toString !== req.user._id) {
      throw new AccecDeniedError('Access denied');
    }
    await userDeleteCard.remove();
    return res.send({ data: userDeleteCard });
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({
      message: statusCode === 500 ? 'Произошла ошибка' : err.message,
    });
  }
};

module.exports.createCard = async (req, res) => {
  const { name, link } = req.body;
  try {
    const userCreateCard = await Card.create({ name, link, owner: req.user._id })
      .orFail(() => new NotFoundError('Card list is empty'));
    return res.send(userCreateCard);
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({
      message: statusCode === 500 ? 'Произошла ошибка' : err.message,
    });
  }
};

module.exports.likeCard = async (req, res) => {
  try {
    const userLikeCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(() => new NotFoundError('Card list is empty'));
    return res.send(userLikeCard);
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({
      message: statusCode === 500 ? 'Произошла ошибка' : err.message,
    });
  }
};


module.exports.dislikeCard = async (req, res) => {
  try {
    const userDislikeCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(() => new NotFoundError('Card list is empty'));
    return res.send(userDislikeCard);
  } catch (err) {
    const statusCode = err.statusCode || 500;
    return res.status(statusCode).send({
      message: statusCode === 500 ? 'Произошла ошибка' : err.message,
    });
  }
};
