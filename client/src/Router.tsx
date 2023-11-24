import {
    Route,
    createBrowserRouter,
    RouterProvider,
    createRoutesFromElements,
} from "react-router-dom";
import { useCookies } from "react-cookie";

import MainLayout from "./layouts/MainLayout";
import Summary from "./pages/Summary/Summary";
import Auth from "./pages/Auth/Auth";
import Create from "./pages/Create/Create";
import Cards from "./pages/Cards/Cards";
import Protected from "./components/Protected/Protected";
// ! ROUTER === APP

const App = () => {
    //eslint-disable-next-line
    const [cookies, setCookie, removeCookie] = useCookies(undefined);
    const authToken = cookies?.AuthToken;
    const userEmail = cookies?.Email;
    const currency = cookies?.Currency;
    const userName = cookies?.Name;

    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/" element={<MainLayout userName={userName} />}>
                    <Route
                        index
                        element={
                            <Protected authToken={authToken}>
                                <Summary
                                    authToken={authToken}
                                    userEmail={userEmail}
                                    userName={userName}
                                    currency={currency}
                                />
                            </Protected>
                        }
                    ></Route>
                    <Route
                        path="create"
                        element={
                            <Protected authToken={authToken}>
                                <Create
                                    userName={userName}
                                    userEmail={userEmail}
                                ></Create>
                            </Protected>
                        }
                    ></Route>
                    <Route
                        path="cards"
                        element={
                            <Protected authToken={authToken}>
                                <Cards
                                    userEmail={userEmail}
                                    userName={userName}
                                ></Cards>
                            </Protected>
                        }
                    ></Route>
                </Route>
                <Route
                    path="auth"
                    element={<Auth authToken={authToken} />}
                ></Route>
                <Route path="*" element={<>page not found</>}></Route>
            </>
        )
    );

    return <RouterProvider router={router}></RouterProvider>;
};

export default App;
