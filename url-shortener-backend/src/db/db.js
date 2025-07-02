import mongoose from "mongoose";

const connectDb = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const connectDbInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(
      `Database connected! DB host: ${connectDbInstance.connection.host}`
    );
  } catch (error) {
    console.error("ERROR: ", error);
    process.exit(1);
  }
};

export default connectDb;
