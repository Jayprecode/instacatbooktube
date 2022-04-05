/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";

import HeartOutlinedIcon from "components/Icons/HeartOutlinedIcon";
import HeartIcon from "components/Icons/HeartIcon";

const index: React.FC = ({ cats, add }: any) => (
    <div id="images">
        {cats.map((image) => {
            const { author, download_url, id } = image;
            // Get data favorites from the local storage
            const dataInstorage = localStorage.getItem("favorites");
            const getArray = (): [] => {
                if (dataInstorage) {
                    return JSON.parse(dataInstorage);
                }
                return [];
            };
            // @ts-ignore
            const isFav = getArray().findIndex((fav) => fav.id === image.id) !== -1;

            return (
                // eslint-disable-next-line react/no-array-index-key
                <div key={id} className="mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        alt={author}
                        data-src={download_url}
                        className="card-img-top"
                        src="https://picsum.photos/id/870/300/300?grayscale&blur=2"
                    />
                    <div className="btn" onClick={() => add(image)}>
                        {isFav ? <HeartIcon /> : <HeartOutlinedIcon />}
                    </div>
                </div>
            );
        })}
    </div>
);

export default index;
