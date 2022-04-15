/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

/* -------------------------------------------------------------------------- */
/*                            Internal Dependencies                           */
/* -------------------------------------------------------------------------- */
import LogoutIcon from "components/Icons/LogoutIcon";
import HeartMultipleIcon from "components/Icons/HeartMultipleIcon";

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    height: 56px;
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    transition: 0.8s all ease;
    width: 100%;
`;

const index = () => {
    const router = useRouter();
    return (
        <HeaderContainer>
            {router.pathname.includes("/auth/signin") ? (
                ""
            ) : (
                <>
                    <button
                        className="log-out btn"
                        type="button"
                        onClick={() => {
                            localStorage.clear();
                            router.push("/auth/signin");
                        }}
                    >
                        <LogoutIcon />
                    </button>
                    <h4 className="brand-name">Instacatbooktube</h4>
                    {/* @ts-ignore */}
                    <div
                        className="favorites"
                        /* @ts-ignore */
                        type="button"
                        onClick={() => router.push("/favorites")}
                    >
                        <HeartMultipleIcon />
                    </div>
                </>
            )}
        </HeaderContainer>
    );
};
export default index;
