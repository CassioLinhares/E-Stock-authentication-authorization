import { BrowserRouter } from 'react-router-dom';
import { useEffect } from 'react';

import { useAuth } from "../hooks/auth";
import { USER_ROLE } from "../utils/roles";
import { api } from '../services/api';

import { AuthRoutes } from './auth.routes';
import { AdminRoutes } from './admin.routes';
import { SaleRoutes } from './sale.routes';
import { CustomerRoutes } from './customer.routes';

export function Routes() {
  const { user, signOut } = useAuth();

  function AccessRoutes() {
    switch (user.role) {
      case USER_ROLE.ADMIN: 
        return <AdminRoutes />
      case USER_ROLE.SALE: 
        return <SaleRoutes />
      case USER_ROLE.CUSTOMER: 
        return <CustomerRoutes />
      default: 
        return <CustomerRoutes />
    }
  }

  useEffect(() => {
    api.get("/users/validated").catch((error) => {
      if (error.response?.status === 401) {
        signOut();
      }
    })
  }, [])

  return (
    <BrowserRouter>
      {user ? <AccessRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
}