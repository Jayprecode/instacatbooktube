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
    .item-enter {
        transform: translateX(100%);
    }
    .item-enter-active {
        transform: translateX(0);
        transition:all 1s ease;
    }      
    
    .item-exit {
        transform: translateX(0);
    }
    .item-exit-active {
        transform: translateX(-100%);
        transition:all 1s ease;
    } 
    .brown {
        color: #cc8862 !important;
        border: 1px solid #cc8862;
        background: #ffffff;
        animation: shake 0.5s;
        &:focus {
            outline: none;
            box-shadow: none;
            border-color: #cc8862 !important;
        }
    }
    .green {
        color: #62cc6d;
        border: 1px solid #d3f8db;
        background: #ffffff;
        &:focus {
            outline: none;
            box-shadow: none;
            border-color: #d3f8db !important;
        }
    }
    .full_green {
        color: #62cc6d;
        border: 1px solid #d3f8db;
        background: #d3f8db;
        &:focus {
            outline: none;
            box-shadow: none;
            border-color: #d3f8db !important;
        }
    }
    .grayed-out {
        color: #858585;
        border: 1px solid #e7e7e7;
        background: #d3f8db;
    }
    @keyframes shake {
        0% {
            transform: translate(0);
        }
        20% {
            transform: translate(3em);
        }
        40% {
            transform: translate(-3em);
        }
        60% {
            transform: translate(3em);
        }
        80% {
            transform: translate(-3em);
        }
        100% {
            transform: translate(0);
        }
    }
`;

export default GlobalStyle;
export { theme };
