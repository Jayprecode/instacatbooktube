/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
// @ts-nocheck
import React from "react";
// import styled from "styled-components";
import HeartOutlinedIcon from "components/Icons/HeartOutlinedIcon";
import HeartIcon from "components/Icons/HeartIcon";

const index: React.FC = ({ cats, add }: any) => (
    <div>
        {cats.map((image) => {
            const { url, id, isFav } = image;
            return (
                <div
                    key={id}
                    className="mb-3"
                    style={{
                        minHeight: "300px",
                    }}
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt={id}
                        loading="lazy"
                        data-src={url}
                        className="card-img-top"
                        src="https://picsum.photos/10"
                    />
                    <div
                        className="btn"
                        onClick={() => {
                            add(image);
                        }}
                    >
                        {isFav ? <HeartIcon /> : <HeartOutlinedIcon />}
                    </div>
                </div>
            );
        })}
    </div>
);

export default index;
