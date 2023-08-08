import PaginationPage from '../pages/pagination';

export interface RouteItem {
  path: string;
  element: React.ReactNode;
}

const mainRoutes: RouteItem[] = [
  {
    path: '/',
    element: <></>,
  },
  {
    path: '/pagination',
    element: <PaginationPage />,
  },
];

export default mainRoutes;
