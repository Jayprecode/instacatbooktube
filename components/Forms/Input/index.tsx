/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import React from "react";
import { Form } from "react-bootstrap";
import styled from "styled-components";

const StyledInput = styled(Form.Control)`
    border-radius: 4px;
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    color: #3e3e3e;
    .brown {
        color: #cc8862;
        border: 1px solid #cc8862;
        background: #ffffff;
    }
    .green {
        color: #62cc6d;
        border: 1px solid #d3f8db;
        background: #ffffff;
    }
    .full_green {
        color: #62cc6d;
        border: 1px solid #d3f8db;
        background: #d3f8db;
    }
    .grayed-out {
        color: #858585;
        border: 1px solid #e7e7e7;
        background: #d3f8db;
    }
`;

const index = ({ type, variant, className, children, ...rest }: any) => (
    <StyledInput
        type={type}
        className={`${
            variant === "invalid"
                ? "brown"
                : variant === "valid"
                ? "green"
                : variant === "submitting"
                ? "full_green"
                : variant === "disabled"
                ? "grayed-out"
                : ""
        } btn`}
        {...rest}
    />
);

export default index;
