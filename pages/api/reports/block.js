import { MongoClient } from "mongodb";

export default async function block(req, res) {
  if (req.method === "PUT") {
    const body = JSON.parse(req.body);

    try {
      const client = await MongoClient.connect(
        process.env.NEXT_PUBLIC_MONGODB_KEY
      );
      const db = client.db();
      const result = await db
        .collection("reports")
        .updateOne({ id: body.id }, { $set: { blocked: true } });
      client.close();

      res
        .status(200)
        .json({ status: "Ok", message: "Report Blocked Successfully" });
        
    } catch (error) {
      console.log("DB_ERROR", error.message);
    }
  }
}
