import express, { Request, Response } from 'express';
import users_route from './api/users_endpoints';
import products_route from './api/products_endpoint';
import orders_route from './api/orders_endpoints';
import register from './api/register';
import { verifyJWT } from './utilities/middlewares';

const mainRoute = express.Router();

// map the main route to the api resources
mainRoute.use('/register/', register);
mainRoute.use('/users/', users_route);
mainRoute.use('/products/', products_route);
mainRoute.use('/orders/', orders_route);

export default mainRoute;
