import React from "react";
import { render, screen } from "@testing-library/react";

import CategoriesPage from "../CategoriesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders categories page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CategoriesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("categories-datatable")).toBeInTheDocument();
    expect(screen.getByRole("categories-add-button")).toBeInTheDocument();
});
