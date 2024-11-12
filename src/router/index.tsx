
import RouteTemplate from "@/components/route-template";
import { Dashboard } from "@/pages/dashboard";
import { SubwayLine } from "@/pages/subway-line";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route>
                <Route path="/" element={<RouteTemplate><Dashboard /></RouteTemplate>} />
                <Route path="/frequencia-de-linhas" element={<RouteTemplate><SubwayLine /></RouteTemplate>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;