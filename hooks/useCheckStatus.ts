import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

const login = "/auth/signin"; // Define your login route address.

const useCheckAuthStatus = () => {
    const router = useRouter();

    // const { user, isMakingRequest } = useSelector(({ Auth }) => Auth);

    useLayoutEffect(() => {
        const isAuthenticated = localStorage.getItem("apiKey");
        if (!isAuthenticated) {
            router.push(login);
        }
    }, []);
    return null;
};

export default useCheckAuthStatus;
