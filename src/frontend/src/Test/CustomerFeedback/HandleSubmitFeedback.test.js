import { HandleSubmitFeedback } from '../../Helper/HandleSubmitFeedback';
import { SubmitFeedback } from '../../Services/SubmitFeedback.Services';
import toast from 'react-hot-toast'; // Import the toast library

// Mocking the toast library
jest.mock('react-hot-toast', () => ({
    error: jest.fn(),
    success: jest.fn(),
}));

// Mocking the SubmitFeedback service function
jest.mock('../../Services/SubmitFeedback.Services', () => ({
    SubmitFeedback: jest.fn(),
}));

describe('HandleSubmitFeedback function', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mock function calls before each test
    });

    it('should display an error toast if any feedback field is empty', () => {
        // Arrange
        const customerFeedback = { field1: 1, field2: 2, field3: 0 }; // Example feedback with one field empty
        const orderId = '123';
        const setLoading = jest.fn();
        const navigate = jest.fn();

        // Act
        HandleSubmitFeedback(customerFeedback, orderId, setLoading, navigate);

        // Assert
        expect(toast.error).toHaveBeenCalledWith('Kindly fill the full feedback form');
        expect(SubmitFeedback).not.toHaveBeenCalled(); // SubmitFeedback should not have been called
        expect(toast.success).not.toHaveBeenCalled(); // toast.success should not have been called
        expect(navigate).not.toHaveBeenCalled(); // navigate should not have been called
    });

    it('should submit feedback successfully and navigate to home page', () => {
        // Arrange
        const customerFeedback = { field1: 1, field2: 2, field3: 3 }; // Example filled feedback
        const orderId = '123';
        const setLoading = jest.fn();
        const navigate = jest.fn();
        const mockResult = { order_id: '123' };
        SubmitFeedback.mockReturnValueOnce(mockResult); // Mocking SubmitFeedback to return a result

        // Act
        HandleSubmitFeedback(customerFeedback, orderId, setLoading, navigate);

        // Assert
        expect(toast.error).not.toHaveBeenCalled(); // toast.error should not have been called
        expect(SubmitFeedback).toHaveBeenCalledWith(orderId, setLoading);
        expect(toast.success).toHaveBeenCalledWith('Feedback submitted successfully');
        expect(navigate).toHaveBeenCalledWith('/');
    });

    it('should display an error toast if feedback submission fails', () => {
        // Arrange
        const customerFeedback = { field1: 1, field2: 2, field3: 3 }; // Example filled feedback
        const orderId = '123';
        const setLoading = jest.fn();
        const navigate = jest.fn();
        const error = 'Submission failed';
        SubmitFeedback.mockReturnValueOnce(error); // Mocking SubmitFeedback to return an error

        // Act
        HandleSubmitFeedback(customerFeedback, orderId, setLoading, navigate);

        // Assert
        expect(toast.error).toHaveBeenCalledWith(error);
        expect(SubmitFeedback).toHaveBeenCalledWith(orderId, setLoading);
        expect(toast.success).not.toHaveBeenCalled(); // toast.success should not have been called
        expect(navigate).not.toHaveBeenCalled(); // navigate should not have been called
    });
});
