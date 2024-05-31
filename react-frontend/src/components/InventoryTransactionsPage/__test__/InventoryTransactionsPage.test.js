import React from "react";
import { render, screen } from "@testing-library/react";

import InventoryTransactionsPage from "../InventoryTransactionsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders inventoryTransactions page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InventoryTransactionsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("inventoryTransactions-datatable")).toBeInTheDocument();
    expect(screen.getByRole("inventoryTransactions-add-button")).toBeInTheDocument();
});
