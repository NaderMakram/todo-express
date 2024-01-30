import express from "express";
import axios from "axios";
import cors from "cors";
import bodyParser from "body-parser";
import ToDo from "./models/Todo.js";
import { config } from 'dotenv'
import mongoose from 'mongoose';

config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());

app.get("/api/todos", async (req, res) => {
  const todos = await ToDo.find();
  res.send(todos);
});

app.get("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todos = await ToDo.findById(id);
  res.send(todos);
});

app.delete("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todos = await ToDo.findByIdAndDelete(id);
  res.send(todos);
});

app.post("/api/todos", async (req, res) => {
  const todos = await ToDo.create(req.body);
  res.send(todos);
});

app.put("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await ToDo.findByIdAndUpdate(id, req.body);
  res.send(todos);
});

app.patch("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  const todo = await ToDo.findByIdAndUpdate(id, req.body);
  res.send(todos);
});




app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.airtable.com/v0/app4GVG5QETa94mUJ/tblgBZNGKlwS0RygH`,
      {
        headers: {
          Authorization: `Bearer patR6qxROwtC6iFh6.73e5c0d694b44d0aebbdccd40e0acc44be65a899eff4c2e3a9408395756521ed`,
        },
      }
    );
    res.json(response.data.records);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/post", async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    await axios
      .post(
        "https://api.airtable.com/v0/app4GVG5QETa94mUJ/tblgBZNGKlwS0RygH",
        {
          fields: {
            Name: data,
          },
        },
        {
          headers: {
            Authorization: `Bearer patR6qxROwtC6iFh6.73e5c0d694b44d0aebbdccd40e0acc44be65a899eff4c2e3a9408395756521ed`,
          },
        }
      )
      .then(res.json({ message: "Data received successfully!" }));
  } catch {
    res.json({ message: "there has been an error" });
  }
});

app.listen(3000, async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_URI
    )
    console.log('Server running.')
  } catch (error) {
    console.log(error)
  }
});
