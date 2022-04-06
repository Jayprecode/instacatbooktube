/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { CSSTransition, TransitionGroup } from "react-transition-group";
/* -------------------------------------------------------------------------- */
/*                            Internal Dependencies                           */
/* -------------------------------------------------------------------------- */
import HeartIcon from "components/Icons/HeartIcon";
import Layout, { Wrapper } from "components/Layout";

const WrapperContainerFav = styled(Wrapper)`
    margin-top: 4rem;
    .mb-3 {
        position: relative;
        .btn {
            background: #62cc6d;
            border-radius: 4px;
            position: absolute;
            right: 0;
            bottom: 0;
            margin: 1rem;
        }
    }
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
            <WrapperContainerFav>
                <TransitionGroup id="images" className="mb-3">
                    {favorites.map((image) => {
                        const { author, download_url, id } = image;
                        return (
                            <CSSTransition timeout={500} id={id} classNames="item">
                                <div key={id} className="mb-3">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        alt={author}
                                        data-src={download_url}
                                        className="card-img-top"
                                        src={download_url}
                                    />
                                    <div className="btn" onClick={() => removeFav(image)}>
                                        <HeartIcon />
                                    </div>
                                </div>
                            </CSSTransition>
                        );
                    })}
                </TransitionGroup>
            </WrapperContainerFav>
        </Layout>
    );
};

export default Favorites;
