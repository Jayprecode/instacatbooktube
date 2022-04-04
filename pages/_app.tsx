/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import type { AppProps } from "next/app";
import Router from "next/router";
import { positions, Provider as AlertProvider, transitions } from "react-alert";

// nprogress
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import "normalize.css";
import "bootstrap/dist/css/bootstrap.min.css";
/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import GlobalStyle from "styles/Global";
import AlertTemplate from "components/AlertTemplate";

const TIMEOUT = 150;

let progressBarTimeout: any = null;

const clearProgressBarTimeout = () => {
    if (progressBarTimeout) {
        clearTimeout(progressBarTimeout);
        progressBarTimeout = null;
    }
};

const startProgressBar = () => {
    clearProgressBarTimeout();
    progressBarTimeout = setTimeout(() => {
        Nprogress.start();
    }, TIMEOUT);
};

const stopProgressBar = () => {
    clearProgressBarTimeout();
    Nprogress.done();
};

//
Router.events.on("routeChangeStart", () => {
    startProgressBar();
});

Router.events.on("routeChangeComplete", () => {
    stopProgressBar();
});

Router.events.on("routeChangeError", () => {
    stopProgressBar();
});
//

const options = {
    position: positions.TOP_CENTER,
    timeout: 4000,
    offset: "30px",
    transition: transitions.SCALE,
};

const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <GlobalStyle />
        {/* @ts-ignore */}
        <AlertProvider template={AlertTemplate} {...options}>
            <Component {...pageProps} />
        </AlertProvider>
    </>
);

export default MyApp;
