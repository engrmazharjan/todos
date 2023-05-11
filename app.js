const express = require("express");
const app = express();
const Port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

let tasks = [];

const createTask = (description) => {
  const task = {
    id: Date.now().toString(),
    description: description,
    completed: false,
  };

  tasks.push(task);
};

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
};

const toggleTaskStatus = (id) => {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
};

app.get("/", (req, res) => {
  res.render("index", { tasks });
});

app.post("/", (req, res) => {
  const { task } = req.body;
  createTask(task);
  res.redirect("/");
});

app.put("/", (req, res) => {
  const { taskId } = req.body;
  toggleTaskStatus(taskId);
  res.redirect("/");
});

app.delete("/", (req, res) => {
  const { taskId } = req.body;
  deleteTask(taskId);
  res.redirect("/");
});

app.listen(Port, () => {
  console.log(`Server Listening at https://localhost:${Port}`);
});
