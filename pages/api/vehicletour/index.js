import nextConnect from 'next-connect'
import dbConnect from '../../../lib/dbConnect'
import {createVehicleTour,getAllVehicleTour} from '../../../controllers/vehicletour'


const handler = nextConnect();
dbConnect();
handler
    .post(createVehicleTour)
    .get(getAllVehicleTour);

    export const config = {
        api: {
            responseLimit: false,
            
          },
        };
export default handler;