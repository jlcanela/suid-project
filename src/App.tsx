/* @refresh reload */

import Home from "./pages/Home";
import { Route, Router } from "@solidjs/router";
import { CustomAppBar } from "./components/CustomAppBar";
import { Box } from "@suid/material";
import Features from "./pages/Features";
import Administration from "./pages/Administration";
import Projects from "./pages/Projects";
import EditProject from "./pages/EditProject";
import Parties from "./pages/Parties";
import FormJs from "./pages/FormJs";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import { SolidQueryDevtools } from '@tanstack/solid-query-devtools'

export function App() {
  const queryClient = new QueryClient()
  
  return (
    <>
  <QueryClientProvider client={queryClient}>
  <SolidQueryDevtools />
      <CustomAppBar />
      <Box sx={{ margin: 2 }}>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/features" component={Features} />
          <Route path="/projects/:id/edit" component={EditProject} />
          <Route path="/projects/:id" component={EditProject} />
          <Route path="/projects" component={Projects} />
          <Route path="/parties" component={Parties} />
          <Route path="/admin" component={Administration} />
          <Route path="/formjs" component={FormJs} />
        </Router>
      </Box>
  </QueryClientProvider>
    </>
  );
}
