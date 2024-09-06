import { connectDb } from "@/lib/connectDb"
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {

    const db = await connectDb()
    const deleteCollection = db.collection('bookings');

    try {
        const resp = await deleteCollection.deleteOne({ _id: new ObjectId(params.id) });
        return NextResponse.json({ message: "deleted bookings", response: resp });
    } catch (error) {
        return NextResponse.json({ message: "something wrong" });
    }


};
export const PATCH = async (request, { params }) => {

    const db = await connectDb()
    const deleteCollection = db.collection('bookings');
    const updateDoc = await request.json();

    try {
        const resp = await deleteCollection.updateOne(
            { _id: new ObjectId(params.id) },
            {
                $set: {
                    ...updateDoc
                },
            },
            {
                upsertOne: true
            },
        );
        return NextResponse.json({ message: "Updated  bookings", response: resp });
    } catch (error) {
        return NextResponse.json({ message: "something wrong" });
    }


};
export const GET = async (request, { params }) => {

    const db = await connectDb()
    const deleteCollection = db.collection('bookings');

    try {
        const resp = await deleteCollection.findOne({ _id: new ObjectId(params.id) });
        return NextResponse.json({ message: " bookings Found", response: resp });
    } catch (error) {
        return NextResponse.json({ message: "something wrong" });
    }


}