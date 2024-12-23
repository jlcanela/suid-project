/* @refresh reload */

import Home from "./pages/Home";
import { Route, Router } from "@solidjs/router";

import { Box } from "@suid/material";
import Features from "./pages/Features";
import Administration from "./pages/Administration";
import Parties from "./pages/PartiesPage";
import FormJs from "./pages/FormJs";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from "@tanstack/solid-query-devtools";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import PartyDetailPage from "./pages/PartyDetailPage";
import { Auth0 } from "./auth";
import { authConfig } from "./auth/authConfig";
import Profile from "./pages/Profile";
import { NavBar } from "./components/NavBar";
import { SolidFlowSample } from "./pages/SolidFlow";
import NetworkGraph from "./pages/NetworkGraph";
import Report from "./pages/Report";
import BPMNEditor from "./pages/BPMNEditor";
import Pdf from "./pages/Pdf";

import ToolingMenu from "./layouts/ToolingMenu";
import Tooling from "./pages/tooling";
import BPMN from "./pages/BPMN";
import Forms from "./pages/Forms";
import DMN from "./pages/DMN";

import BusinessEditor from "./pages/BusinessEditor";
// theme.ts
import { createTheme } from "@suid/material/styles";

// First, extend the Breakpoint type
declare module "@suid/material/styles" {
  interface BreakpointOverrides {
    xxl: true; // adds the xxl breakpoint
  }
}

// Create the custom theme
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1920, // add your custom breakpoint value
    },
  },
});

// App.tsx
import { ThemeProvider } from "@suid/material/styles";
import { Container } from "@suid/material";

function Layout(props) {
  return (
    <>
      <NavBar />
      <Box
        sx={{
          maxWidth: "80%", // Set maximum width
          margin: "30px auto", // Center the box
        }}
      >
        {props.children}
      </Box>
    </>
  );
}

export function App() {
  const queryClient = new QueryClient();

  return (
    <Auth0
      domain={authConfig.domain} // domain from Auth0
      clientId={authConfig.clientId} // client_id from Auth0
      audience={authConfig.authorizationParams.audience} // audience from Auth0
      logoutRedirectUri={`${window.location.origin}/logout`} // Absolute URI Auth0 logout redirect
      loginRedirectUri={`${window.location.origin}/`} // Absolute URI Auth0 login
    >
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SolidQueryDevtools />
          <Router root={Layout}>
            <Route path="/" component={Home} />
            <Route path="/features" component={Features} />
            <Route path="/projects/:id/edit" component={ProjectDetailPage} />
            <Route path="/projects/:id" component={ProjectDetailPage} />
            <Route path="/projects" component={ProjectsPage} />
            <Route path="/parties/:id/edit" component={PartyDetailPage} />
            <Route path="/parties/:id" component={PartyDetailPage} />
            <Route path="/parties" component={Parties} />
            <Route path="/admin" component={Administration} />
            <Route path="/profile" component={Profile} />
            <Route path="/formjs" component={FormJs} />
            <Route path="/solid-flow" component={SolidFlowSample} />
            <Route path="/network" component={NetworkGraph} />
            <Route path="/report" component={Report} />
            <Route path="/pdf-report" component={Pdf} />
            <Route path="/bpmn-editor" component={BPMNEditor} />
            <Route path="/tooling" component={ToolingMenu}>
              <Route path="/" component={Tooling} />
              <Route path="/bpmn" component={BPMN} />
              <Route path="/forms" component={Forms} />
              <Route path="/dmn" component={DMN} />
            </Route>
            <Route path="/business-editor" component={BusinessEditor} />
          </Router>
        </QueryClientProvider>
      </ThemeProvider>
    </Auth0>
  );
}
