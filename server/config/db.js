import mongoose from 'mongoose';

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB is connected : ${connection.connection.host}`);
    } catch(error){
        console.error(error);
        process.exit(1);
    }
}

export default connectDB;