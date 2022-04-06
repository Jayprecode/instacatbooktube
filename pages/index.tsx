/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useReducer, useRef, useEffect, useState } from "react";
import type { NextPage } from "next";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";
/* -------------------------------------------------------------------------- */
/*                            Internal Dependencies                           */
/* -------------------------------------------------------------------------- */

import { useInfiniteScroll, useLazyLoading } from "hooks/is-io";
import Layout, { Wrapper } from "components/Layout";
import ImageList from "components/ImageList";

const WrapperContainer = styled(Wrapper)`
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

const Home: NextPage = () => {
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
    // Get data favorites from the local storage

    const addFav = (image) => {
        const newFav = [...favorites, image];
        // @ts-ignore
        setFavorites(newFav);

        // Local Storage
        localStorage.setItem("favorites", JSON.stringify(newFav));
    };

    // make API calls and pass the returned data via dispatch
    const useFetch = (data, dispatch) => {
        useEffect(() => {
            dispatch({ type: "FETCHING_IMAGES", fetching: true });
            fetch(`https://picsum.photos/v2/list?page=${data.page}&limit=2`)
                // eslint-disable-next-line no-shadow
                .then((data) => data.json())
                .then((images) => {
                    dispatch({ type: "STACK_IMAGES", images });
                    dispatch({ type: "FETCHING_IMAGES", fetching: false });
                })
                .catch((e) => {
                    // handle error
                    dispatch({ type: "FETCHING_IMAGES", fetching: false });
                    return e;
                });
        }, [dispatch, data.page]);
    };

    const imgReducer = (state, action) => {
        switch (action.type) {
            case "STACK_IMAGES":
                return { ...state, images: state.images.concat(action.images) };
            case "FETCHING_IMAGES":
                return { ...state, fetching: action.fetching };
            default:
                return state;
        }
    };

    const pageReducer = (state, action) => {
        switch (action.type) {
            case "ADVANCE_PAGE":
                return { ...state, page: state.page + 1 };
            default:
                return state;
        }
    };

    const [pager, pagerDispatch] = useReducer(pageReducer, { page: 0 });
    const [imgData, imgDispatch] = useReducer(imgReducer, { images: [], fetching: true });

    const bottomBoundaryRef = useRef(null);
    useFetch(pager, imgDispatch);
    useLazyLoading(".card-img-top", imgData.images);
    useInfiniteScroll(bottomBoundaryRef, pagerDispatch);

    return (
        <Layout title="Home">
            <WrapperContainer>
                {/* @ts-ignore */}
                <ImageList cats={imgData.images} add={addFav} />
                {imgData.fetching && (
                    <div className="text-center m-auto p-3">
                        <Spinner animation="grow" variant="success" />
                    </div>
                )}
                <div
                    id="page-bottom-boundary"
                    style={{ border: "1px solid red" }}
                    ref={bottomBoundaryRef}
                />
            </WrapperContainer>
        </Layout>
    );
};

export default Home;
