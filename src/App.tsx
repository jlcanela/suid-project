/* @refresh reload */

import Home from "./pages/Home";
import { Route, Router } from "@solidjs/router";
import { CustomAppBar } from "./components/CustomAppBar";
import { Box } from "@suid/material";
import Features from "./pages/Features";
import Administration from "./pages/Administration";
import Parties from "./pages/PartiesPage";
import FormJs from "./pages/FormJs";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import PartyDetailPage from "./pages/PartyDetailPage";

export function App() {
  const queryClient = new QueryClient()
  return (
    <>
  <QueryClientProvider client={queryClient}>
  <SolidQueryDevtools />
      <CustomAppBar />
      <Box 
          sx={{ 
            maxWidth: '80%', // Set maximum width
            margin: '30px auto',   // Center the box
          }}
        >
        <Router>
          <Route path="/" component={Home} />
          <Route path="/features" component={Features} />
          <Route path="/projects/:id/edit" component={ProjectDetailPage} /> 
          <Route path="/projects/:id" component={ProjectDetailPage} />
          <Route path="/projects" component={ProjectsPage} />
          <Route path="/parties/:id/edit" component={PartyDetailPage} /> 
          <Route path="/parties/:id" component={PartyDetailPage} />
          <Route path="/parties" component={Parties} />
          <Route path="/admin" component={Administration} />
          <Route path="/formjs" component={FormJs} />           
        </Router>
      </Box>
  </QueryClientProvider>
    </>
  );
}
