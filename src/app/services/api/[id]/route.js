import { connectDb } from "@/lib/connectDb";
import { NextResponse } from "next/server";




export const GET = async (request, { params }) => {
    const db = await connectDb()
    const servicesCollection = db.collection("services");

    try {
        const service = await servicesCollection.findOne({ _id: params.id });
        return NextResponse.json({ service })




    } catch (error) {
        return NextResponse.json({ message: "No Data Found", error });

    }
};