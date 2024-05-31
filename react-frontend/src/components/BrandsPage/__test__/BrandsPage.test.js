import React from "react";
import { render, screen } from "@testing-library/react";

import BrandsPage from "../BrandsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders brands page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <BrandsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("brands-datatable")).toBeInTheDocument();
    expect(screen.getByRole("brands-add-button")).toBeInTheDocument();
});
