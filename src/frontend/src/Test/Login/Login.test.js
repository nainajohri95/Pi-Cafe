import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { HandleLogin } from '../../Helper/HandleLogin.Helper';
import Login from "../../Component/Local/HomePage/Login"

jest.mock('../../Helper/HandleLogin.Helper');

describe('Login', () => {
    let setUserDetails;
  
    beforeEach(() => {
      setUserDetails = jest.fn();
    });
  
    test('should render input fields and login button', async () => {
      render(<Login setUserDetails={setUserDetails} />);
  
      // Wait for lazy-loaded components to be loaded
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Ex: EMP123')).toBeInTheDocument();
      });
      expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
    });
  
    test('should call HandleLogin on button click', async () => {
      render(<Login setUserDetails={setUserDetails} />);
  
      // Wait for lazy-loaded components to be loaded
      await waitFor(() => {
        expect(screen.getByPlaceholderText('Ex: EMP123')).toBeInTheDocument();
      });
  
      fireEvent.change(screen.getByPlaceholderText('Ex: EMP123'), { target: { value: 'EMP123' } });
      fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });
      fireEvent.click(screen.getByText('Login'));
  
      // Wait for the HandleLogin function to be called
      await waitFor(() => {
        expect(HandleLogin).toHaveBeenCalledWith({
          employeeId: 'EMP123',
          password: 'password123',
          errorMsg: { employeeId: '', password: '' },
          setErrorMsg: expect.any(Function),
          setUserDetails,
          setLoading: expect.any(Function)
        });
      });
    });
  });