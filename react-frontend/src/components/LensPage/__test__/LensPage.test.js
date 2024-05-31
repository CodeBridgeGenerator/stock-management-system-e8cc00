import React from "react";
import { render, screen } from "@testing-library/react";

import LensPage from "../LensPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders lens page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <LensPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("lens-datatable")).toBeInTheDocument();
    expect(screen.getByRole("lens-add-button")).toBeInTheDocument();
});
