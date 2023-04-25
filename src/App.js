import React from "react";
import { QueryClient, QueryClientProvider, defaultQueryFn } from "react-query";
// import a plugin
import { Toaster } from "react-hot-toast";
// router
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

// notification alert
import { RtlLayout } from "src/components";
// JWT context
import { AuthProvider } from "src/contexts/jwtContext";
// redux
import { store } from "src/redux/store";
import { Provider as ReduxProvider } from "react-redux";
// ----------------------------------------------------------------------

export default function App() {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            queryFn: defaultQueryFn,
          },
        },
      })
  );
  return (
    <ReduxProvider store={store}>
      <ThemeConfig>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RtlLayout>
              <GlobalStyles />
              <Toaster />
              <Router />
            </RtlLayout>{" "}
          </AuthProvider>{" "}
        </QueryClientProvider>{" "}
      </ThemeConfig>{" "}
    </ReduxProvider>
  );
}
