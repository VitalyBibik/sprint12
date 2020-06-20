const Card = require('../models/cards');
const NotFoundError = require('../errors/NotFoundError');
const AccessDeniedError = require('../errors/AccessDeniedError');


module.exports.getCards = async (req, res, next) => {
  try {
    const userGetCards = await Card.find({})
      .orFail(() => new NotFoundError('Card list is empty'));
    return res.send(userGetCards);
  } catch (err) {
    return next(err);
  }
};
module.exports.deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const userDeleteCard = await Card.findById(cardId).populate('owner')
      .orFail(() => new NotFoundError('The card was already deleted Or Cardlist is empty'));
    if (!userDeleteCard.owner.equals(req.user._id)) {
      throw new AccessDeniedError('Access denied');
    }
    await userDeleteCard.remove();
    return res.send(userDeleteCard);
  } catch (err) {
    return next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  try {
    const userCreateCard = await Card.create({ name, link, owner: req.user._id });
    return res.send(userCreateCard);
  } catch (err) {
    return next(err);
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const userLikeCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    ).orFail(() => new NotFoundError('Card list is empty'));
    return res.send(userLikeCard);
  } catch (err) {
    return next(err);
  }
};


module.exports.dislikeCard = async (req, res, next) => {
  try {
    const userDislikeCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    ).orFail(() => new NotFoundError('Card list is empty'));
    return res.send(userDislikeCard);
  } catch (err) {
    return next(err);
  }
};
