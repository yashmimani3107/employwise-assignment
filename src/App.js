import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import appStore from './redux/appStore';
import Login from './components/Login';
import UserList from './components/UserList';

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<UserList />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
