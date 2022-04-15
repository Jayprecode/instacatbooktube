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
    height: 40px;
    text-align: left;
    width: 100%;
    .input {
        color: #3e3e3e;
        border: 1px solid #e7e7e7;
    }
    &:focus {
        outline: none;
        box-shadow: none;
        border-color: #e7e7e7;
    }
`;

const Input = ({ variant, ...rest }: any) => (
    <StyledInput
        type="text"
        className={`${
            variant === "inValid"
                ? "brown"
                : variant === "valid"
                ? "green"
                : variant === "submitting"
                ? "full_green"
                : variant === "disabled"
                ? "grayed-out"
                : ""
        } input`}
        {...rest}
    />
);

export default Input;
