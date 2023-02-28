import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getDayExcursionFromNepal } from "../../../../controllers/dayexcursion";

const handler = nextConnect();
dbConnect();
handler.get(getDayExcursionFromNepal);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;
