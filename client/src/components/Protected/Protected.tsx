import { FC } from "react";
import { Navigate } from "react-router-dom";

interface IProtected {
    children: any;
    authToken: boolean;
}

const Protected: FC<IProtected> = ({ children, authToken }) => {
    if (!authToken) {
        return <Navigate to="/auth" replace></Navigate>;
    }
    return children;
};

export default Protected;
