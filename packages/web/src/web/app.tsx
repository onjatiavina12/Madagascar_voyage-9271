import { useEffect } from "react";
import { Route, Switch, useLocation } from "wouter";
import { Provider } from "./components/provider";
import { LangProvider } from "./lib/i18n";
import { SiteLayout } from "./components/site/layout";
import Home from "./pages/home";
import Services from "./pages/services";
import Destinations from "./pages/destinations";
import Etudes from "./pages/etudes";
import About from "./pages/about";
import Contact from "./pages/contact";
import { AgentFeedback, RunableBadge } from "@runablehq/website-runtime";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function App() {
  return (
    <Provider>
      <LangProvider>
        <ScrollToTop />
        <SiteLayout>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/services" component={Services} />
            <Route path="/destinations" component={Destinations} />
            <Route path="/voyages-etudes" component={Etudes} />
            <Route path="/a-propos" component={About} />
            <Route path="/contact" component={Contact} />
            <Route>
              <div className="mx-auto max-w-[1200px] px-5 py-40 text-center">
                <h1 className="text-4xl text-forest">404</h1>
              </div>
            </Route>
          </Switch>
        </SiteLayout>
      </LangProvider>
      {/* Do not remove — off by default, activated by parent iframe via postMessage */}
      {import.meta.env.DEV && <AgentFeedback />}
      {/* "Made with Runable" badge - if user asks to remove the runable badge, remove this code as well as comment */}
      {<RunableBadge />}
    </Provider>
  );
}

export default App;
