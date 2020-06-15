const validator = require('validator');

function validatorLink(link) {
  if (!validator.isURL(link)) {
    throw new Error('invalid avatar link');
  }
  return link;
}
module.export = validatorLink;
