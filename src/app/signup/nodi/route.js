import { connectDb } from "@/lib/connectDb";
import bcrypt from "bcrypt";

export const POST = async (request) => {
    const newUser = await request.json();
    try {

        const db = await connectDb();
        const userCollection = db.collection("users");
        const exist = await userCollection.findOne({ email: newUser.email });
        if (exist) {
            return Response.json({ message: 'user exit' }, { status: 304 });
        }
        const hashPassword = bcrypt.hashSync(newUser.password, 10);
        const resp = await userCollection.insertOne({ ...newUser, password: hashPassword });
        return Response.json({ mesage: 'user created' }, { status: 200 });

    } catch (error) {
        return Response.json({ mesage: 'somthing wrong' }, { status: 500 });
    }
}