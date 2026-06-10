const express = require("express");

const router = express.Router();

const {
  register,
  login,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

router.get(
  "/profile",
  authMiddleware,
  (req, res) => {
    res.json({
      message: "Protected Route Accessed",
      user: req.user,
    });
  }
);
router.put("/:id", async (req, res) => {
  try {
    const signature =
      await Signature.findByIdAndUpdate(
        req.params.id,
        {
          x: req.body.x,
          y: req.body.y,
        },
        { new: true }
      );

    res.json(signature);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;