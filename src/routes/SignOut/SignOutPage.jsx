import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../../components/authProvider";
import { DashboardWrapper } from "../../components/dashboardWrapper";
import { logout } from "../../firebase/firebase";


function SignOutPage() {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
    const [stateLogin, setLoginState] = useState(0);

    const handleUserLoggedIn = async (user) => {
        await logout();
        setCurrentUser(user);
        setLoginState(2);
    }
    const handleNotLoggedIn = (user) => {
        navigate('/login');
    }
    const handleNotRegistered = () => {
        navigate('/login');
    }

    if (stateLogin === 0) {
        return (
            <AuthProvider
                userLoggedIn={handleUserLoggedIn}
                userNotLoggedIn={handleNotLoggedIn}
                userNotRegistered={handleNotRegistered}
            >
                Loading...
            </AuthProvider>

        );
    }

    return (
        <DashboardWrapper avtiveLinks={[false, false, true]}>
            <h1>SIGN OUT</h1>
        </DashboardWrapper>
    )
}

export { SignOutPage };