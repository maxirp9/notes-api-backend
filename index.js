const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./loggerMiddleware");

app.use(express.json());
app.use(cors());

app.use(logger);

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

// const app = http.createServer((request, response) => {
//   response.writeHead(200, { "Content-Type": "application/json" });
//   response.end(JSON.stringify(friends));
// });

app.get("/", (req, res) => {
  res.send("<h1> Hello World </h1>");
});

app.get("/api/notes", (req, res) => {
  console.log("GET_ALL");
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  console.log("GET_ID");
  const id = Number(req.params.id);
  const note = notes.find((note) => note.id === id);

  if (note) res.json(note);
  else res.status(404).end();
});

app.delete("/api/notes/:id", (req, res) => {
  console.log("DELETE");
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id != id);
  console.log(notes);
  res.status(204).end();
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  if (!note || !note.content) {
    return res.status(400).json({
      error: "note.content is missing",
    });
  }
  console.log(note);
  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);
  const newNote = {
    id: maxId + 1,
    name: note.content,
  };

  notes = [...notes, newNote];

  res.status(201).json(newNote);
});

app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
  });
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
