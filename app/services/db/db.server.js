import mongoose from "mongoose";

const dbURL = process.env.DATABASE_URL;

if (!dbURL) {
  throw new Error("Please define the DATABASE_URL");
}

let db;

export async function run() {
  try {
    if (db) return db;
    if (process.env.NODE_ENV === "production") {
      db = await mongoose.connect(dbURL, {
        useNewUrlParser: true,
      });
    } else {
      if (!global._db) {
        global._db = await mongoose.connect(dbURL, {
          useNewUrlParser: true,
        });
      }
      db = global._db;
    }
    console.log("Mongodb connected");
  } catch {
    console.error("error while mondodb processing");
  }
}

run();

export default mongoose;
