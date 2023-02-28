import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getDayExcursionFromSrilanka } from "../../../../controllers/dayexcursion";

const handler = nextConnect();
dbConnect();
handler.get(getDayExcursionFromSrilanka);

export const config = {
  api: {
    responseLimit: false,
    
  },
};
export default handler;
