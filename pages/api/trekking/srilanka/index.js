import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getTrekFromSrilanka } from "../../../../controllers/trekking";

const handler = nextConnect();
dbConnect();
handler.get(getTrekFromSrilanka);

export const config = {
  api: {
    responseLimit: false,
    
  },
};
export default handler;
