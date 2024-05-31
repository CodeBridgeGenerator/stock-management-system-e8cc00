import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import NoMatch from './NoMatch';

import LoginPage from '../components/LoginPage/LoginPage';
import SignUpPage from '../components/LoginPage/SignUpPage';
import Account from '../components/Account/Account';
import Dashboard from '../components/Dashboard/Dashboard';
import WhatToDoPage from '../components/WhatTodo';

import UserProjectLayoutPage from "../components/UsersPage/UserProjectLayoutPage";
import SingleUsersPage from "../components/UsersPage/SingleUsersPage";
// ~cb-add-import~

const MyRouter = () => {
    return (
        <Routes>
            <Route path="" exact element={<Dashboard />} />
            <Route path="/dashboard" exact element={<Dashboard />} />
            <Route path="/login" exact element={<LoginPage />} />
            <Route path="/signup" exact element={<SignUpPage />} />

            <Route element={<ProtectedRoute redirectPath={'/login'} />}>
                <Route path="/account" exact element={<Account />} />
<Route path="/usersLayout/users" exact element={<UserProjectLayoutPage />} />
<Route path="/users/:singleUsersId" exact element={<SingleUsersPage />} />
<Route path="/users" exact element={<UserProjectLayoutPage />} />
<Route path="/lens/:singleLensId" exact element={<SingleLensPage />} />
<Route path="/brands/:singleBrandsId" exact element={<SingleBrandsPage />} />
<Route path="/categories/:singleCategoriesId" exact element={<SingleCategoriesPage />} />
<Route path="/lensesDetails/:singleLensesDetailsId" exact element={<SingleLensesDetailsPage />} />
<Route path="/customers/:singleCustomersId" exact element={<SingleCustomersPage />} />
<Route path="/orders/:singleOrdersId" exact element={<SingleOrdersPage />} />
<Route path="/orderItems/:singleOrderItemsId" exact element={<SingleOrderItemsPage />} />
<Route path="/inventoryTransactions/:singleInventoryTransactionsId" exact element={<SingleInventoryTransactionsPage />} />
                {/* ~cb-add-protected-route~ */}
            </Route>
            {/* ~cb-add-route~ */}

            <Route path="*" element={<NoMatch />} />
        </Routes>
    );
};

export default MyRouter;
