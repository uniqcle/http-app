import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

Sentry.init({
    dsn: "https://7a6f2266678d11ec86c2bad23d412dd7@o0.ingest.sentry.io/0",
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0,
});

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
