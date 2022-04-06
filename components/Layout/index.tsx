/* -------------------------------------------------------------------------- */
/*                            External Dependencies                            */
/* -------------------------------------------------------------------------- */

import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";

/* -------------------------- Internal Dependencies ------------------------- */
import SkipToMain from "components/A11y/skip-to-main";
import Header from "components/Header";

interface Props {
    title: string;
    children: React.ReactNode;
}

const Main = styled.main`
    height: 100vh;
    width: 100%;
    @media (min-width: 680px) {
        display: none;
    }
`;

const Layout: React.FC<Props> = ({ children, title }) => (
    <Main>
        <Helmet>
            <title>{`${title} | Instacatbooktube`}</title>
            <meta name="ms-application-TileColor" content="#000000" />
            <meta name="theme-color" content="#000000" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0 viewport-fit=cover"
            />
        </Helmet>
        <SkipToMain content="main-content" />
        <Header />
        {children}
    </Main>
);

interface WrapperProps {
    className?: string;
    children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, className = "", ...rest }) => (
    <section {...rest}>
        <div className={`container  ${className}`}>
            <div className="row align-items-center justify-content-center">{children}</div>
        </div>
    </section>
);

export default Layout;
