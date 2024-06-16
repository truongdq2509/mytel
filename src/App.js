
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './config/i18n'
import { routerList } from './config/routerList';
import { Fragment } from 'react';

function App() {

  return (
    <Router>
      <Routes>
        {routerList.map((route, index) => {
          const Page = route.component;
          let Layout = null;
          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}

export default App;
