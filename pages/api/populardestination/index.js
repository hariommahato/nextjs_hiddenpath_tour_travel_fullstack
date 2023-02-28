import nextConnect from "next-connect";
import dbConnect from "../../../lib/dbConnect";
import {
  createPopularDestination,
  getAllPopularDestination,
} from "../../../controllers/populardestination.js";

const handler = nextConnect();
dbConnect();
handler.post(createPopularDestination).get(getAllPopularDestination);

export const config = {
  api: {
    responseLimit: false,
    
  },
};
export default handler;
