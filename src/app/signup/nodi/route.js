import { connectDb } from "@/lib/connectDb";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    try {
        const newUser = await request.json();

        // Connect to the database
        const db = await connectDb();
        const userCollection = db.collection("users");

        // Check if the user already exists
        const existingUser = await userCollection.findOne({ email: newUser.email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 409 }); // 409: Conflict
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(newUser.password, 10); // Use async hashing
        const result = await userCollection.insertOne({ ...newUser, password: hashedPassword });

        return NextResponse.json({ message: 'User created successfully', userId: result.insertedId }, { status: 201 });

    } catch (error) {
        console.error('Error creating user:', error);

        return NextResponse.json({ message: 'Something went wrong', error: error.message }, { status: 500 });
    }
};
