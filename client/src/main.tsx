import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Router.tsx";

// import { Provider } from "react-redux";
// import { store } from "./store/store.ts";

import "./styles/normalize.css";
import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        {/* <Provider store={store}> */}
            <App />
        {/* </Provider> */}
    </React.StrictMode>
);
