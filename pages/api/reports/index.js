import { MongoClient } from "mongodb";

export default async function reports(req, res) {
  if (req.method === "GET") {
    try {
      const client = await MongoClient.connect(
        process.env.NEXT_PUBLIC_MONGODB_KEY
      );
      const db = client.db();

      const result = await db.collection("reports").find({blocked : undefined}).toArray();

      client.close();
      res.status(200).json({ status: "Ok", data: result });
    } catch (error) {
      console.log("DB_ERROR", error.message);
      res.status(400).json({ status: "Error", data: error.message });
    }
  }
}
