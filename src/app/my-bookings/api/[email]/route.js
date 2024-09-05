import { connectDb } from "@/lib/connectDb";


export const GET = async (request, { params }) => {
    const db = await connectDb()
    const bookingsCollection = db.collection("bookings");

    try {
        const myBookings = await bookingsCollection.find({ email: params.email }).toArray();
        return Response.json({ myBookings })




    } catch (error) {
        console.log(error);

    }
};
