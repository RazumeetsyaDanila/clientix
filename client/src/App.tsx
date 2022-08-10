import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import "./app.scss";
import AppRouter from './components/AppRouter';
import { check } from './http/userAPI';
import { useActions } from './hooks/useActions';

const App: React.FC = () => {
  const { setUser } = useActions()

  useEffect(() => {
    check().then(data => {
      let anyData: any = data
      setUser(anyData.login, anyData.role)
    })
  }, [])

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;
