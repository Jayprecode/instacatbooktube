/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useReducer, useRef, useEffect } from "react";
import type { NextPage } from "next";
import { Spinner } from "react-bootstrap";
import styled from "styled-components";
/* -------------------------------------------------------------------------- */
/*                            Internal Dependencies                           */
/* -------------------------------------------------------------------------- */

import { useInfiniteScroll, useLazyLoading } from "hooks/is-io";
import Layout, { Wrapper } from "components/Layout";
import ImageList from "components/ImageList";

import useCheckAuthStatus from "hooks/useCheckStatus";
import config from "../config";

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
    useCheckAuthStatus();

    // make API calls and pass the returned data via dispatch
    const useFetch = (data, dispatch) => {
        useEffect(() => {
            dispatch({ type: "FETCHING_IMAGES", fetching: true });
            fetch(`${config().baseUrl}/images/search`, {
                method: "GET",
                // @ts-ignore
                headers: {
                    ...config().headers,
                },
            })
                // eslint-disable-next-line no-shadow
                .then((data) => data.json())
                .then((images) => {
                    // console.log(images);
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
            case "SET_FAVORITES":
                return { ...state, images: action.images };
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

    const addFav = (image) => {
        fetch(`${config().baseUrl}/favourites`, {
            method: "POST",
            // @ts-ignore
            headers: {
                ...config().headers,
            },
            body: JSON.stringify({
                "image_id": image.id,
            }),
        })
            .then((data) => data.json())
            .then(() => {
                const favouritedImages = imgData.images.find(({ id }) => {
                    return image.id === id;
                });
                favouritedImages.isFav = true;
                const newState = [...imgData.images];
                imgDispatch({ type: "SET_FAVORITES", images: newState });
            });
    };
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
