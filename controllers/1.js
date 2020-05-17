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
