import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getDayExcursionFromIndia } from "../../../../controllers/dayexcursion";

const handler = nextConnect();
dbConnect();
handler.get(getDayExcursionFromIndia);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;
