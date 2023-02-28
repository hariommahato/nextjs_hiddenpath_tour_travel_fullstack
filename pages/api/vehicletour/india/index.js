import nextConnect from "next-connect";
import dbConnect from "../../../../lib/dbConnect";
import { getVehicleTourFromIndia } from "../../../../controllers/vehicletour";

const handler = nextConnect();
dbConnect();
handler.get(getVehicleTourFromIndia);

export const config = {
  api: {
    responseLimit: false,
    
  },
};
export default handler;
