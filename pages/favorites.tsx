/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
/* -------------------------------------------------------------------------- */
/*                            Internal Dependencies                           */
/* -------------------------------------------------------------------------- */
import HeartIcon from "components/Icons/HeartIcon";
import Layout, { Wrapper } from "components/Layout";

const WrapperContainer = styled(Wrapper)`
    margin-top: 4rem;
`;

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Get data favorites from the local storage
        const dataInstorage = localStorage.getItem("favorites");
        const getArray = () => {
            if (dataInstorage) {
                return JSON.parse(dataInstorage);
            }
            return [];
        };
        const fav = getArray();
        if (fav.length !== 0) {
            // @ts-ignore
            setFavorites([...fav]);
        }
    }, []);

    const removeFav = (image) => {
        // @ts-ignore
        const newFav = favorites.filter((fav) => fav.id !== image.id);
        setFavorites(newFav);

        // Local Storage
        localStorage.setItem("favorites", JSON.stringify(newFav));
    };
    return (
        <Layout title="favorites">
            <WrapperContainer>
                <div id="images">
                    {favorites.map((image) => {
                        const { author, download_url, id } = image;
                        console.log(image);
                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={id} className="mb-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt={author}
                                    data-src={download_url}
                                    className="card-img-top"
                                    src={download_url}
                                    // src="https://picsum.photos/id/870/300/300?grayscale&blur=2"
                                />
                                <div className="btn" onClick={() => removeFav(image)}>
                                    <HeartIcon />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </WrapperContainer>
        </Layout>
    );
};

export default Favorites;
