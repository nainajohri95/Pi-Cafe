import { HandleLogin } from '../../Helper/HandleLogin.Helper';
import { LoginService } from '../../Services/Login.Services';
import "@testing-library/jest-dom"

// Mocking dependencies
jest.mock('../../Services/Login.Services');

describe('HandleLogin', () => {
  it('should return false if employeeId or password is missing', async () => {
    const setErrorMsg = jest.fn();
    const setUserDetails = jest.fn();
    const setLoading = jest.fn();

    await HandleLogin({
      employeeId: '',
      password: '',
      errorMsg: {},
      setErrorMsg,
      setUserDetails,
      setLoading,
    });

    expect(setErrorMsg).toHaveBeenCalled();
    expect(setUserDetails).not.toHaveBeenCalled();
    expect(LoginService).not.toHaveBeenCalled();
    expect(setLoading).not.toHaveBeenCalled();
  });

  it('should call LoginService and setUserDetails when both employeeId and password are provided', async () => {
    const setErrorMsg = jest.fn();
    const setUserDetails = jest.fn();
    const setLoading = jest.fn();

    const mockUserDetails = { /* mock user details */ };
    LoginService.mockResolvedValueOnce(mockUserDetails);

    await HandleLogin({
      employeeId: 'testId',
      password: 'password',
      errorMsg: {},
      setErrorMsg,
      setUserDetails,
      setLoading,
    });

    expect(setErrorMsg).toHaveBeenCalled();
    expect(setUserDetails).toHaveBeenCalledWith(mockUserDetails);
    expect(LoginService).toHaveBeenCalledWith({
      employeeId: 'testId',
      password: 'password',
      setLoading
    });
  });
});
