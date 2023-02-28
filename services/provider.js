import { Provider } from "react-redux";
import { store } from "./store";
import { SessionProvider } from "next-auth/react";
import { SSRProvider } from "react-bootstrap";
export function Providers({ children }) {
  return (
    <Provider store={store}>
      <SessionProvider>
      <SSRProvider>{children}</SSRProvider>
      </SessionProvider>
     
    </Provider>
  );
}
