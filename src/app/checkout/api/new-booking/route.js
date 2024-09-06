import { connectDb } from "@/lib/connectDb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const booking = await request.json();
    const db = await connectDb();
    const bookingCollection = db.collection("bookings");

    try {
        const newBooking = await bookingCollection.insertOne(booking);
        return NextResponse.json({ message: "sevice booking successfully" }, { status: 200 });




    } catch (error) {
        return NextResponse.json({ message: "something wrong" }, { status: 400 });

    }
};
