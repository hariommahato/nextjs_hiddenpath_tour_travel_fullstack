import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getDayExcursionFromPakistan } from "../../../../controllers/dayexcursion";

const handler = nextConnect();
dbConnect();
handler.get(getDayExcursionFromPakistan);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;
