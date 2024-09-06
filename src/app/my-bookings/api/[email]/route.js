import { connectDb } from "@/lib/connectDb";
import { NextResponse } from "next/server";


export const GET = async (request, { params }) => {
    const db = await connectDb()
    const bookingsCollection = db.collection("bookings");

    try {
        const myBookings = await bookingsCollection.find({ email: params.email }).toArray();
        return NextResponse.json({ myBookings })




    } catch (error) {
        return NextResponse({ message: "data not Found" })
    }
};
