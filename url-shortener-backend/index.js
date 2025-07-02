import dotenv from "dotenv";
dotenv.config();
import connectDb from "./src/db/db.js";
import { app } from "./app.js";

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`listening on PORT:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("connection failed", error);
  });
