import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Framework from "@/pages/framework";
import Comparison from "@/pages/comparison";

import FrameworkSelector from "@/pages/framework-selector";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

function Router() {
  return (
    <div className="min-h-screen bg-bg-light">
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/framework/:id" component={Framework} />
        <Route path="/comparison" component={Comparison} />

        <Route path="/framework-selector" component={FrameworkSelector} />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
