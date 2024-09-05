import { connectDb } from "@/lib/connectDb";
import { raichs } from "@/lib/raich";

export const GET = async () => {
    const db = await connectDb();
    const servicesCollection = db.collection("services");

    try {
        const existingData = await servicesCollection.find().toArray();
        if (existingData.length > 0) {
            await servicesCollection.deleteMany();
        }
        const resp = await servicesCollection.insertMany(raichs);
        return new Response(JSON.stringify({ message: "seeded successfully" }), { status: 200 });

    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: "An error occurred", error: error.message }), { status: 500 });
    }
};
