import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import PageNotFound from './pages/error/404';
import Detail from './pages/categories/Detail';
import Dashboard from './pages/dashboard';

const Categories = lazy(() => import('./pages/categories'));

const App = () => {
  return (
    <Dashboard>
      <div className="p-3 md:p-6">
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Categories />
              </Suspense>
            }
          />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Dashboard>
  );
};

export default App;
