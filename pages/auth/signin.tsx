/* -------------------------------------------------------------------------- */
/*                            External Dependencies                            */
/* -------------------------------------------------------------------------- */
import React from "react";
import { useFormik } from "formik";
import styled from "styled-components";
import { object, string } from "yup";
import Layout, { Wrapper } from "components/Layout";
import { Form } from "react-bootstrap";

/* -------------------------- Internal Dependencies ------------------------- */
import Input from "components/Forms/Input";
import Button from "components/Forms/Button";

// Icons

import InstaIcon from "components/Icons/InstaIcon";
import CatIcon from "components/Icons/CatIcon";
import BookIcon from "components/Icons/BookIcon";
import TubeIcon from "components/Icons/TubeIcon";

const Container = styled(Wrapper)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    .banner_icons {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        align-items: center;
        justify-items: center;
        grid-gap: 1rem;
        width: 200px;
        margin-bottom: 3rem;
    }
`;

const SignIn = () => {
    const {
        values,
        handleChange,
        handleBlur,
        // errors,
        // touched,
        handleSubmit,
        isValid,
        isSubmitting,
    } = useFormik({
        initialValues: {
            apiKey: "",
        },
        validationSchema: object().shape({
            apiKey: string().required("ApiKey is required!"),
        }),
        onSubmit: async (formData, { setSubmitting }) => {
            setSubmitting(true);
        },
    });
    return (
        <Layout title="Signin">
            <Container>
                <div className="banner_icons">
                    <InstaIcon />
                    <CatIcon />
                    <BookIcon />
                    <TubeIcon />
                </div>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Input
                            id="apiKey"
                            name="apiKey"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.apiKey}
                            variant=""
                            placeholder="Enter your ApiKey..."
                        />
                    </Form.Group>
                    <Button
                        label="Sign In"
                        disabled={!isValid || isSubmitting}
                        isLoading={isSubmitting}
                        variant=""
                        type="button"
                    />
                </Form>
            </Container>
        </Layout>
    );
};

export default SignIn;
