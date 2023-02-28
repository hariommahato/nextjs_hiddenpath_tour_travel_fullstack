import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getVehicleTourFromPakistan } from "../../../../controllers/vehicletour";

const handler = nextConnect();
dbConnect();
handler.get(getVehicleTourFromPakistan);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;
