import nextConnect from 'next-connect'
import dbConnect from '../../../lib/dbConnect'
import {createPeakClimbing,getAllPeakClimbing} from '../../../controllers/peakclimbing'


const handler = nextConnect();
dbConnect();
handler
    .post(createPeakClimbing)
    .get(getAllPeakClimbing);

    export const config = {
        api: {
          responseLimit:false,
      }
      };
export default handler;