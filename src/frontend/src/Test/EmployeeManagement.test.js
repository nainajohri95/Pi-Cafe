// EmployeeManagement.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import EmployeeManagement from '../Pages/EmployeeManagement';
import { EmployeeData } from '../Constant/Local/MockData/EmployeeData.MockData';

jest.mock('../Component/Global/Navbar', () => () => <div>Navbar Mock</div>);
jest.mock('../Component/Global/EmployeeCard', () => ({ employee }) => <div>EmployeeCard Mock: {employee.name}</div>);

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('EmployeeManagement', () => {
  const mockSetUserDetails = jest.fn();

  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
    mockSetUserDetails.mockClear();
  });

  const renderComponent = () => {
    render(
      <MemoryRouter initialEntries={['/employee-management']}>
        <Routes>
          <Route
            path="/employee-management"
            element={<EmployeeManagement userDetails={null} setUserDetails={mockSetUserDetails} />}
          />
        </Routes>
      </MemoryRouter>
    );
  };

  test('redirects to home if no userDetails in localStorage', async () => {
    localStorage.removeItem('userDetails');
    renderComponent();

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/'));
  });

  test('sets userDetails if present in localStorage', async () => {
    const userDetails = { name: 'John Doe' };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    renderComponent();

    await waitFor(() => expect(mockSetUserDetails).toHaveBeenCalledWith(userDetails));
  });

  test('displays employee cards', () => {
    localStorage.setItem('userDetails', JSON.stringify({ name: 'John Doe' }));

    renderComponent();

    EmployeeData.forEach((employee) => {
      expect(screen.getByText(`EmployeeCard Mock: ${employee.name}`)).toBeInTheDocument();
    });
  });

  test('navigates to create employee page on button click', () => {
    localStorage.setItem('userDetails', JSON.stringify({ name: 'John Doe' }));

    renderComponent();

    const createButton = screen.getByRole('button', { name: 'Create Employee' });
    fireEvent.click(createButton);

    expect(mockNavigate).toHaveBeenCalledWith('/create-employee');
  });
});
