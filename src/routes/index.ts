import { Cart, Home, NotFound } from 'pages';
import { ROUTE_TO_CART, ROUTE_TO_HOME, ROUTE_TO_PAGE_NOT_FOUND } from 'common/constants';

export const publicRoutes = [
  {
    path: ROUTE_TO_HOME,
    Component:Home
  },
  {
    path: ROUTE_TO_CART,
    Component:Cart
  },
  {
    path: ROUTE_TO_PAGE_NOT_FOUND,
    Component:NotFound
  },
]