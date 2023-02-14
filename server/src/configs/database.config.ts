import {connect, ConnectOptions} from 'mongoose';
import mongoose from 'mongoose';

export const dbConnect = () => {
    // only the fields defined in the shcema are able to be saved
    mongoose.set('strictQuery', true);

    connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(
        () => console.log("connect successfully"),
        (error) => console.log(error)
    )
}