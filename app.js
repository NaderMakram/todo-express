const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(bodyParser.text());

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

app.listen(3000);
