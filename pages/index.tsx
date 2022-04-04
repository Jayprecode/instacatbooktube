/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useReducer, useRef, useEffect } from "react";
import type { NextPage } from "next";
import { Spinner } from "react-bootstrap";

/* -------------------------------------------------------------------------- */
/*                            Internal Dependencies                           */
/* -------------------------------------------------------------------------- */

import { useInfiniteScroll, useLazyLoading } from "hooks/is-io";
import Layout, { Wrapper } from "components/Layout";

const Home: NextPage = () => {
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
            <Wrapper>
                <div id="images">
                    {imgData.images.map((image, index) => {
                        // eslint-disable-next-line camelcase
                        const { author, download_url } = image;
                        return (
                            // eslint-disable-next-line react/no-array-index-key
                            <div key={index} className="mb-3">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt={author}
                                    // eslint-disable-next-line camelcase
                                    data-src={download_url}
                                    className="card-img-top"
                                    src="https://picsum.photos/id/870/300/300?grayscale&blur=2"
                                />
                            </div>
                        );
                    })}
                </div>

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
            </Wrapper>
        </Layout>
    );
};

export default Home;
