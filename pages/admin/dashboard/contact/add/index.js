import DashboardNavbar from '@/DasboardComponent/DashboardNavbar';
import { Providers } from '@/services/provider';
import { SessionProvider } from 'next-auth/react';
import React from 'react'

const Contact = () => {
  return (
    <div>
      
    </div>
  )
}

export default Contact
Contact.getLayout = function PageLayout(page) {
  return (
    <>
      <Providers>
        <DashboardNavbar/>
        <SessionProvider>{page}</SessionProvider>
      </Providers>
    </>
  );
};
