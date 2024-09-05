import { connectDb } from "@/lib/connectDb"
import { ObjectId } from "mongodb";

export const DELETE = async (request, { params }) => {

    const db = await connectDb()
    const deleteCollection = db.collection('bookings');

    try {
        const resp = await deleteCollection.deleteOne({ _id: new ObjectId(params.id) });
        return Response.json({ message: "deleted bookings", response: resp });
    } catch (error) {
        return Response.json({ message: "something wrong" });
    }


}
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
        return Response.json({ message: "Updated  bookings", response: resp });
    } catch (error) {
        return Response.json({ message: "something wrong" });
    }


}
export const GET = async (request, { params }) => {

    const db = await connectDb()
    const deleteCollection = db.collection('bookings');

    try {
        const resp = await deleteCollection.findOne({ _id: new ObjectId(params.id) });
        return Response.json({ message: " bookings Found", response: resp });
    } catch (error) {
        return Response.json({ message: "something wrong" });
    }


}