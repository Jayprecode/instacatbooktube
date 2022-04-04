/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */
import styled from "styled-components";

const AlertContainer = styled.div`
    z-index: 999999999999999999;
    margin-top: 95px !important;
    &.inline {
        margin-top: 0 !important;
    }
    .alert {
        border-radius: 12.4444px;
        padding-left: 0.5rem;
        &-dismissible .close {
            top: 6px;
        }
        &-danger {
            background: #f9eeeb;
            border: 1.06667px solid #edc7bd;
        }
        &-success {
            background: #edf7ef;
            border: 1.06667px solid #c5e3c9;
        }
        &-info {
            background: #e7eff9;
            border: 1.06667px solid #b2ccee;
        }
    }
`;

export default AlertContainer;
