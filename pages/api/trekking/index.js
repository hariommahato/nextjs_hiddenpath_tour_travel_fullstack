import nextConnect from "next-connect";
import dbConnect from "../../../lib/dbConnect";
import {
  createTrekking,
  getAllTrekking,
} from "../../../controllers/trekking.js";

const handler = nextConnect();
dbConnect();
handler.post(createTrekking).get(getAllTrekking);

export const config = {
  api: {
    responseLimit: false,
    
  },
};
export default handler;
