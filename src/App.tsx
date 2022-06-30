import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';

import BreweryList from './views/Brewery/List';
import BreweryDetail from './views/Brewery/Detail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/breweries/:id' element={<BreweryDetail />} />
        <Route path='/breweries' element={<BreweryList />} />
        <Route path='/' element={<Navigate to='/breweries' replace />} />
      </Routes>
    </Router>
  );
}
