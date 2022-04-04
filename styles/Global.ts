/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import { createGlobalStyle, css } from "styled-components";

const theme = {};

// Responsive Breakpoints

// $breakpoints: (
//   xxs: 420px,
//   xs: 576px,
//   sm: 768px,
//   md: 992px,
//   lg: 1200px,
//   xl: 1440px
// );

const FontToken = css`
    @media (min-width: 768px) {
        --font-xs: 0.75em;
        --font-sm: 0.875em; /* 14px */
        --font-md: 1.125em; /* 18px */
        --font-lg: 1.667em;
        --font-xl: 3.275em;
    }
    @media (max-width: 768px) {
        --font-xs: 0.6875em;
        --font-sm: 0.813em;
        --font-md: 1.011em;
        --font-lg: 1.517em;
        --font-xl: 2.775em;
    }
`;

const GlobalStyle = createGlobalStyle`
    :root {
        --c-black: #020202;
        --c-white: #FFFFFF;
        --sidebar-width: 285px;
        ${FontToken}
    }

    html,body {
        overflow-x: hidden;
        background-color: var(--c-black1);
        font-family: Roboto, sans-serif;
        font-size: 16px;
    }
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .object-fit-cover {
        object-fit: cover;
    }
    .object-position-center {
        object-position: center;
    }
    .cursor-pointer {
        cursor: pointer;
    }
    .spacer-bottom {
        margin-bottom: 3rem;
    }
    .no-pointer-events {
        pointer-events: none;
    }
    .page-transition-enter {
        opacity: 0;
    }
    .page-transition-enter-active {
        opacity: 1;
        transition: opacity 300ms;
    }
    .page-transition-exit {
        opacity: 1;
    }
    .page-transition-exit-active {
        opacity: 0;
        transition: opacity 300ms;
    }
`;

export default GlobalStyle;
export { theme };
