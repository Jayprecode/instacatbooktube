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
import useCheckAuthStatus from "hooks/useCheckStatus";
import { useLazyLoading } from "hooks/is-io";
import config from "../config";

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
    useCheckAuthStatus();
    useEffect(() => {
        fetch(`${config().baseUrl}/favourites`, {
            method: "GET",
            // @ts-ignore
            headers: {
                ...config().headers,
            },
        })
            // eslint-disable-next-line no-shadow
            .then((data) => data.json())
            .then((data) => setFavorites(data));
    }, []);

    const removeFav = (image) => {
        fetch(`${config().baseUrl}/favourites/${image.id}`, {
            method: "DELETE",
            // @ts-ignore
            headers: {
                ...config().headers,
            },
        })
            .then((data) => data.json())
            .then(() => {
                const favouritedImages = favorites.filter(({ id }) => {
                    return image.id !== id;
                });
                const newState = [...favouritedImages];
                setFavorites(newState);
            });
    };
    useLazyLoading(".card-img-top", favorites);
    return (
        <Layout title="favorites">
            <WrapperContainerFav>
                <TransitionGroup id="images" className="mb-3">
                    {favorites.map((favorite) => {
                        const { id, image } = favorite;
                        return (
                            <CSSTransition timeout={500} key={id} classNames="item">
                                <div key={id} className="mb-3">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        alt={id}
                                        // @ts-ignore
                                        data-src={image.url}
                                        className="card-img-top"
                                        src="https://picsum.photos/10"
                                    />
                                    <div className="btn" onClick={() => removeFav(favorite)}>
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
