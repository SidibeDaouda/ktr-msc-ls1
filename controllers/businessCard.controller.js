const { businessCardErrors } = require("../utils/errors.utils");
const BusinessCardModel = require("../models/businessCard.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

module.exports.getAllbusinessCard = async (req, res) => {
  const user = res.locals.user;
  const businessCards = await BusinessCardModel.find({
    userId: { $ne: user._id },
  }).select();

  res.render("businessCard", { user, businessCards });
};

module.exports.addBusinessCard = async (req, res) => {
  const { user, name, companyName, email, tel } = req.body;
  const json = JSON.parse(user);

  try {
    const businessCard = await BusinessCardModel.create({
      userId: json._id,
      name,
      companyName,
      email,
      tel,
    });

    await UserModel.updateOne(
      user._id,
      {
        $addToSet: { library: businessCard._id },
      },
      { new: true }
    );
    res.render("addBusinessCard", { user, businessCard });
  } catch (err) {
    console.log(err);
    const errors = businessCardErrors(err);
    res.render("addBusinessCard", {
      user,
      errors,
      name,
      companyName,
      email,
      tel,
    });
  }
};

module.exports.getMySavedBusinessCard = async (req, res) => {
  const user = res.locals.user;
  const businessCards = await BusinessCardModel.find({
    userId: user._id,
  }).select();
  res.render("savedBusinessCard", { user, businessCards });
};

// module.exports.saveToLibrary = async (req, res) => {

// };
