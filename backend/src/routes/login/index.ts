import express from "express";
import prisma from "../../services/prisma";

const router = express.Router();

router.post("/", async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      name: req.body.name,
    },
  });
  if (!user) {
    return res.sendStatus(404);
  }
  res.send(user);
});

export default router;
