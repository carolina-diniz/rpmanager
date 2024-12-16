import 'dotenv/config';
import { connect, ConnectOptions } from "mongoose";

export default {
  connect: async () => {
    try {
      console.log("Connecting to database");

      const URI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@rpmanager.lywzass.mongodb.net/?retryWrites=true&w=majority&appName=RPManager`;
      const clientOptions: ConnectOptions = {
        serverApi: {
          version: "1",
          strict: true,
          deprecationErrors: true,
        },
      };

      await connect(URI, clientOptions);
      console.log("Connected to database");
    } catch (error) {
      console.error(error);
    }
  },
};
