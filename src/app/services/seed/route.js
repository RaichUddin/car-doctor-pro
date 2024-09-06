import { connectDb } from "@/lib/connectDb";
import { raichs } from "@/lib/raich";
import { NextResponse } from "next/server";

export const GET = async () => {
    const db = await connectDb();
    const servicesCollection = db.collection("services");

    try {
        // Check if there's existing data
        const existingData = await servicesCollection.find().toArray();

        // Delete existing data if any
        if (existingData.length > 0) {
            await servicesCollection.deleteMany();
        }

        // Seed the database with new data
        const resp = await servicesCollection.insertMany(raichs);

        return NextResponse.json({ message: "Seeded successfully", result: resp }, { status: 200 });

    } catch (error) {
        console.error("Error seeding data:", error);

        // Return error response
        return NextResponse.json({ message: "An error occurred", error: error.message }, { status: 500 });
    }
};
