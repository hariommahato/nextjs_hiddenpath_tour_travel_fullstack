import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TopHeader from "@/components/TopHeader";
import { Providers } from "@/services/provider";

import AlertTemplate from "react-alert-template-basic";


import baseURL from "@/baseUrl";

// import '@/styles/globals.css'
const App = ({
  Component,
  pageProps,
  everest,
  annapurna,
  manaslu,
  langtang,
  offbeaten,
  peakclimbing,
}) => {
  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />);
  }

  return (
    
      <Providers>
        <TopHeader />
        <Header
          everestTrek={everest}
          annapurnaTrek={annapurna}
          manasluTrek={manaslu}
          langtangTrek={langtang}
          offbeatenTrek={offbeaten}
          peakClimbing={peakclimbing}
        />
        <Component {...pageProps} />
        <Footer />
      </Providers>
    
  );
};
export async function getStaticProps() {
  const everest = await fetch(`${baseURL}/api/trekking/everest`);
  const everestTrek = await everest.json();

  const annapurna = await fetch(`${baseURL}/api/trekking/annapurna`);
  const annapurnaTrek = await annapurna.json();

  const manaslu = await fetch(`${baseURL}/api/trekking/manaslu`);
  const manasluTrek = await manaslu.json();

  const langtang = await fetch(`${baseURL}/api/trekking/langtang`);
  const langtangTrek = await langtang.json();

  const offbeaten = await fetch(`${baseURL}/api/trekking/offbeaten`);
  const offbeatenTrek = await offbeaten.json();

  const peakclimbing = await fetch(`${baseURL}/api/peakclimbing`);
  const peakclimbingData = await peakclimbing.json();

  return {
    props: {
      everest: everestTrek,
      annapurna: annapurnaTrek,
      manaslu: manasluTrek,
      langtang: langtangTrek,
      offbeaten: offbeatenTrek,
      peakclimbing: peakclimbingData,
    }, // will be passed to the page component as props
  };
}

export default App;
