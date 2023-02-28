import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getVehicleTourFromBhutan } from "../../../../controllers/vehicletour";

const handler = nextConnect();
dbConnect();
handler.get(getVehicleTourFromBhutan);

export const config = {
  api: {
    responseLimit: false,
   
  },
};
export default handler;
