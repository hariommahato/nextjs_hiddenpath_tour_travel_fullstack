import DashboardNavbar from "@/DasboardComponent/DashboardNavbar";
import { Providers } from "@/services/provider";
import { SessionProvider } from "next-auth/react";
const Dashboard = () => {
  return;
};
export default Dashboard;
Dashboard.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <SessionProvider>
          <DashboardNavbar />
          {page}
        </SessionProvider>
      </Providers>
    </>
  );
};
