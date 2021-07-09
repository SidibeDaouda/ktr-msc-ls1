const businessCardController = require("../controllers/businessCard.controller");

const router = require("express").Router();

router.get("/",businessCardController.getAllbusinessCard);

router.get("/addBusinessCard", (req, res) => {
 const user = res.locals.user; 
  res.render("addBusinessCard", {user});
});

// router.patch("/saveToLibrary/:cardId", businessCardController.saveToLibrary);
router.get("/savedBusinessCard", businessCardController.getMySavedBusinessCard);
router.post("/addBusinessCard", businessCardController.addBusinessCard);


module.exports = router;