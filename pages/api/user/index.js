import nextConnect from "next-connect";
import dbConnect from "../../../lib/dbConnect";
import { getAllUser } from "../../../controllers/user.js";

const handler = nextConnect();
dbConnect();
handler.get(getAllUser);

export const config = {
  api: {
    responseLimit: false,
  },
};
export default handler;
