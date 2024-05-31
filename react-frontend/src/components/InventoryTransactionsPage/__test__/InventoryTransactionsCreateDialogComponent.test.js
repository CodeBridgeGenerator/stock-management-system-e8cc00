import React from "react";
import { render, screen } from "@testing-library/react";

import InventoryTransactionsCreateDialogComponent from "../InventoryTransactionsCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders inventoryTransactions create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <InventoryTransactionsCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("inventoryTransactions-create-dialog-component")).toBeInTheDocument();
});
