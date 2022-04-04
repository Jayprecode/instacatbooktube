/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import type { AppProps } from "next/app";
import Router from "next/router";

// nprogress
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */

import GlobalStyle from "styles/Global";

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

const MyApp = ({ Component, pageProps }: AppProps) => (
    <>
        <GlobalStyle />
        <Component {...pageProps} />
    </>
);

export default MyApp;
