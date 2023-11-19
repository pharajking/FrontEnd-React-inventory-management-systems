import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Master from "../layout/Master";
import Dashboard from "../modules/Dashboard";
import Error500 from "../modules/Error500";
import AddCategory from "../modules/category/AddCategory";
import CategoryList from "../modules/category/CategoryList";
import Loader from "../partials/miniComponent/Loader";
import CategoryEdit from "../modules/category/CategoryEdit";
import SubCategoryAdd from "../modules/subCategory/SubCategoryAdd";
import SubCategoryList from "../modules/subCategory/SubCategoryList";
import SubCategoryEdit from "../modules/subCategory/SubCategoryEdit";
import BrandAdd from "../modules/brand/BrandAdd";
import BrandList from "../modules/brand/BrandList";
import BrandEdit from "../modules/brand/BrandEdit";
import SupplierAdd from "../modules/suppliers/SupplierAdd";
import SupplierList from "../modules/suppliers/SupplierList";
import SupplierEdit from "../modules/suppliers/SupplierEdit";
import ProductAttribute from "../modules/productAttribute/ProductAttribute";



const ProjectRouter = createBrowserRouter([
    {
        path: '/',
        element: <Master/>,
        children: [
            {
                path: '/',
                element: <Dashboard/>
            },
            {
                path: '/category/create',
                element: <AddCategory/>
            },
            {
                path: '/category/edit/:id',
                element: <CategoryEdit/>
            },
            {
                path: '/sub-category',
                element: <SubCategoryList/>
            },
            {
                path: '/sub-category/create',
                element: <SubCategoryAdd/>
            },
            {
                path: '/sub-category/edit/:id',
                element: <SubCategoryEdit/>
            },
            {
                path: '/brand/create',
                element: <BrandAdd/>
            },
            {
                path: '/brand/edit/:id',
                element: <BrandEdit/>
            },
            {
                path: '/brand/',
                element: <BrandList/>
            },
            {
                path: '/supplier/',
                element: <SupplierList/>
            },
            {
                path: '/supplier/create',
                element: <SupplierAdd/>
            },
            {
                path: '/supplier/edit/:id',
                element: <SupplierEdit/>
            },
            {
                path: '/category',
                element: <CategoryList/>
            },

            {
                path: '/product-attributes',
                element: <ProductAttribute/>
            },
           
            {
                path: '/error-500',
                element: <Error500/>
            }
        ],

}

])

export default ProjectRouter;