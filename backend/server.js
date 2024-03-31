const { app } = require("./app");
const mongoose = require("mongoose");

async function connectToDatabase() {
  try {
    const url =
      "mongodb+srv://satyasubhammahalik1999:JZKJLHhCB1W0OftT@cluster0.akjorbr.mongodb.net/mamaearth";
    await mongoose.connect(url);
    console.log("connected to database");
  } catch (err) {
    console.log("Unable to connect to database", err);
  }
}
connectToDatabase();

app.listen(8000, () => {
  console.log("server is running on port 8000");
});
