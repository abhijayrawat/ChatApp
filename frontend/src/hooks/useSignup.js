import React from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
    const [loading, setLoading] = React.useState(false);
    const { authUser, setAuthUser } = useAuthContext(); // Ensure useAuthContext is correctly implemented

    const signup = async ({ fullname, username, password, confirmPassword, gender }) => {
        const success = handleInputErrors({ fullname, username, password, confirmPassword, gender });
        if (!success) return;

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullname, username, password, confirmPassword, gender })
            });

            const data = await res.json();
            console.log(data);

            if (data.error) {
                throw new Error(data.error); // Throw error if backend returns an error message
            }

            localStorage.setItem('chat-user', JSON.stringify(data)); // Store user data in localStorage
            setAuthUser(data); // Update authentication context with user data

        } catch (error) {
            console.error(error);
            toast.error('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

function handleInputErrors({ fullname, username, password, confirmPassword, gender }) {
    if (!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error('All fields are required');
        return false;
    }
    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }
    if (password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return false;
    }

    return true;
}

export default useSignup;
