import express from "express";
import prisma from "../../services/prisma";

const router = express.Router();

//returns a list with all notes
router.get("/", async (req, res) => {
  const notes = await prisma.note.findMany({ include: { author: true } });
  res.send(notes);
});

//post to create new note
router.post("/", async (req, res) => {
  const { title, content, authorId } = req.body;
  const note = await prisma.note.create({
    data: {
      title,
      content,
      authorId: parseInt(authorId, 10),
    },
  });
  res.send(note);
});

//update note
router.put("/", async (req, res) => {
  const { title, content, noteId } = req.body;
  const note = await prisma.note.update({
    where: {
      id: parseInt(noteId, 10),
    },
    data: {
      title,
      content,
    },
  });
  res.send(note);
});

//get info from spec. note
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const note = await prisma.note.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });
  res.send(note);
});

//delete note
router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const note = await prisma.note.delete({
    where: {
      id: parseInt(id, 10),
    },
  });
  res.send(note);
});

export default router;
