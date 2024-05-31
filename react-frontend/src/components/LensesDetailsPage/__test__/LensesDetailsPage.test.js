import React from "react";
import { render, screen } from "@testing-library/react";

import LensesDetailsPage from "../LensesDetailsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders lensesDetails page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LensesDetailsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("lensesDetails-datatable")).toBeInTheDocument();
    expect(screen.getByRole("lensesDetails-add-button")).toBeInTheDocument();
});
