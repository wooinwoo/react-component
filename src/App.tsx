import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/layout/header';
import SideBar from './components/layout/sidebar'; //사이드바
import mainRoutes, { RouteItem } from './routes/mainRoute';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <SideBar />
      <div className="flex justify-center flex-col lg:ml-56 mt-16 p-10 bg-base-200 min-h-[calc(100vh-64px)]  transition-all">
        <Routes>
          {mainRoutes.map((route: RouteItem, index: number) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
