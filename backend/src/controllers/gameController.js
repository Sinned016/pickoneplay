import { prisma } from "../config/db.js";
import { compressImage } from "../utils/compressImage.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

// User adds 3 cards:
// Card 1: Coke vs Fanta
// Card 2: Sprite vs Pepsi
// Card 3: A vs B

//Then you send from frontend:
//pairs: [card1, card2, card3]

// I need more info about the game here
// genres etc... so we can filter when searching on the frontend.
const createGame = async (req, res) => {
  try {
    const user = req.user;

    const { title, description, category, tags, pairs } = req.body;

    const parsedTags = JSON.parse(tags || "[]");
    const parsedPairs = JSON.parse(pairs || "[]");

    if (!title || !description || !parsedPairs) {
      return res.status(400).json({
        status: "error",
        message: "Title, Decription and Game pairs is required",
      });
    }

    const existingGame = await prisma.game.findUnique({
      where: { title: title },
    });

    if (existingGame) {
      return res.status(400).json({
        status: "error",
        message: "A game with that Title already exist",
      });
    }

    if (!Array.isArray(parsedPairs) || parsedPairs.length < 4) {
      return res.status(400).json({
        status: "error",
        message: "You must provide atleast 4 pairs",
      });
    }

    const getFile = (fieldname) =>
      req.files.find((f) => f.fieldname === fieldname);

    let gameImageUrl = null;

    const gameImageFile = getFile("image");

    if (gameImageFile) {
      const compressed = await compressImage(gameImageFile.buffer);
      const result = await uploadToCloudinary(compressed);

      gameImageUrl = result.secure_url;
    }

    const game = await prisma.game.create({
      data: {
        title,
        description,
        image: gameImageUrl,
        category,
        tags: parsedTags,
        createdBy: user.id,
        pairs: {
          create: await Promise.all(
            parsedPairs.map(async (pair, index) => {
              const leftImageFile = getFile(`pairs[${index}][leftImage]`);
              const rightImageFile = getFile(`pairs[${index}][rightImage]`);

              let leftImageUrl = null;
              let rightImageUrl = null;

              if (leftImageFile) {
                const compressed = await compressImage(leftImageFile.buffer);
                const result = await uploadToCloudinary(compressed);
                leftImageUrl = result.secure_url;
              }

              if (rightImageFile) {
                const compressed = await compressImage(rightImageFile.buffer);
                const result = await uploadToCloudinary(compressed);
                rightImageUrl = result.secure_url;
              }

              return {
                leftName: pair.leftName,
                rightName: pair.rightName,
                leftImage: leftImageUrl,
                rightImage: rightImageUrl,
              };
            }),
          ),
        },
      },
      include: {
        pairs: true,
      },
    });

    return res.status(201).json({
      status: "success",
      data: game,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Update a game like this.
// {
//   "title": "Soda Battle",
//   "description": "Updated description",
//   "pairs": [
//     {
//       "id": "pair1",
//       "leftScore": 5
//     },
//     {
//       "id": "pair2",
//       "rightName": "Pepsi Max"
//     }
//   ]
// }
// IMAGE IS CURRENTLY NOT INCLUDED
const updateGame = async (req, res) => {
  try {
    const gameId = req.params.id;

    const { title, description, pairs } = req.body;

    if (!title && !description && !pairs) {
      return res.status(400).json({
        error: "At least one field is required to update",
      });
    }

    // Updating the game
    if (title !== undefined || description !== undefined) {
      await prisma.game.update({
        where: {
          id: gameId,
        },
        data: {
          title,
          description,
        },
      });
    }

    // Updating the games pairs
    // In same cases we might not update everything, but it still works because
    if (pairs?.length > 0) {
      // Could use a normal loop here instead of transaction but this is faster and rolls it all back if one doesnt update.
      await prisma.$transaction(
        pairs.map((pair) =>
          prisma.pair.update({
            where: { id: pair.id },
            data: clean({
              leftName: pair.leftName,
              leftImage: pair.leftImage,
              leftScore: pair.leftScore,
              rightName: pair.rightName,
              rightImage: pair.rightImage,
              rightScore: pair.rightScore,
            }),
          }),
        ),
      );
    }

    const updatedGame = await prisma.game.findUnique({
      where: { id: gameId },
      include: { pairs: true },
    });

    res.status(200).json({
      status: "success",
      data: updatedGame,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteGame = async (req, res) => {
  try {
    const user = req.user;
    const gameId = req.params.id;

    const game = await prisma.game.findUnique({
      where: { id: gameId },
    });

    // Check if the user that is trying to delete is the actual owner of the game.
    if (game.createdBy !== user.id) {
      res.status(400).json({
        status: "Author error",
        message: "Only the author or admin can delete the game",
      });
    }

    // Delete the game
    await prisma.game.delete({
      where: {
        id: gameId,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Game deleted",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getGames = async (req, res) => {
  try {
    const games = await prisma.game.findMany();

    res.status(200).json({
      status: "success",
      data: games,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getGame = async (req, res) => {
  try {
    const gameId = req.params.id;

    const game = await prisma.game.findUnique({
      where: { id: gameId },
    });

    res.status(200).json({
      status: "success",
      data: game,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

// Here i will get the full game with id, including pairs
const getFullGame = async (req, res) => {
  try {
    const gameId = req.params.id;

    const game = await prisma.game.findUnique({
      where: { id: gameId },
      include: {
        pairs: true,
      },
    });

    res.status(200).json({
      status: "success",
      data: game,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export { createGame, updateGame, deleteGame, getGame, getFullGame, getGames };
