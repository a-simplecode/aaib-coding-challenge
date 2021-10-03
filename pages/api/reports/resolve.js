import { MongoClient } from "mongodb";

export default async function resolve(req, res) {
  if (req.method === "PUT") {
    const body = JSON.parse(req.body);

    try {
      const client = await MongoClient.connect(
        process.env.NEXT_PUBLIC_MONGODB_KEY
      );
      const db = client.db();
      const result = await db
        .collection("reports")
        .updateOne({ id: body.id }, { $set: { resolved: true } });
      client.close();

      res
        .status(200)
        .json({ status: "Ok", message: "Report Resolved Successfully" });
    } catch (error) {
      console.log("DB_ERROR", error.message);
    }
  }
}
