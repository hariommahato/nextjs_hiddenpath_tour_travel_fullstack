import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getDayExcursionFromTibet } from "../../../../controllers/dayexcursion";

const handler = nextConnect();
dbConnect();
handler.get(getDayExcursionFromTibet);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;
