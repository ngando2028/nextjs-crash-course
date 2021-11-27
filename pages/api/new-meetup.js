import { MongoClient } from "mongodb";

//api/new-meetup

async function handler(req, res) {
	if (req.method === "POST") {
		const data = req.body;
		// const { title, image, address, description } = data;
		const client = await MongoClient.connect(
			"mongodb+srv://ngando:Ngan15937!@cluster0.md7gt.mongodb.net/meetup?retryWrites=true&w=majority"
		);

		const db = client.db();
		const meetupsCollection = db.collection("meetups");
		const result = await meetupsCollection.insertOne(data);
		client.close();
		res.status(201).json({ message: "Meetup inserted" });
	}
}

export default handler;
