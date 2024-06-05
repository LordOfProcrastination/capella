const express = require("express");
const cors = require("cors");
const app = express();
const routes = require("./routes/routes");

app.use(cors());

app.use(express.json());

app.use("/api/storyAPI", routes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
