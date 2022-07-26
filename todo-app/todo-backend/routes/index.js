const express = require("express");
const router = express.Router();

const configs = require("../util/config");
const redis = require("../redis");
let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;
  res.send({
    ...configs,
    visits,
  });
});

router.get("/statistics", async (req, res) => {
  try {
    const addedTodos = await redis.getAsync("added_todos");
    addedTodos === null
      ? res.send({ added_todos: 0 })
      : res.send({
          added_todos: parseInt(addedTodos),
        });
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
