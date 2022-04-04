/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import styled from "styled-components";
/* -------------------------------------------------------------------------- */
/*                            Internal Dependencies                           */
/* -------------------------------------------------------------------------- */

const B = styled.div`
    position: relative;
    .btn {
        padding: 1rem 1.1rem;
        font-size: 1rem;
        line-height: 1rem;
        border-radius: 4px;
        font-weight: 400 !important;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        &:focus {
            box-shadow: none;
        }
    }
    .btn_dark-green {
        border: 1px solid #62cc6d;
        background: #62cc6d;
        color: #ffffff;
        &:hover {
            opacity: 0.7;
        }
    }
    .btn_light-green {
        border: 1px solid #62cc6d;
        background: #62cc6d;
        color: #ffffff;
        opacity: 0.7;
        &:hover {
            opacity: 1;
        }
    }
    .btn_gray {
        background: #858585;
        border: 1px solid #858585;
        color: #ffffff;
        &:hover {
            opacity: 0.8;
        }
    }
`;

const Button = ({ label, variant, type, ...rest }: any) => (
    <B {...rest}>
        <button
            // eslint-disable-next-line react/button-has-type
            type={type || "button"}
            className={`${
                variant === "dg"
                    ? "btn_dark-green"
                    : variant === "lg"
                    ? "btn_light-green"
                    : "btn_gray"
            } btn`}
        >
            {label}
        </button>
    </B>
);

export default Button;
