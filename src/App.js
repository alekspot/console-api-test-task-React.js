import React, {Suspense} from 'react';

import LoginPage from './components/LoginForm/LoginPage';
import {connect} from "react-redux";
import {getUserData} from './redux/actions';


const ConsoleContainer = React.lazy(() => import('./components/ConsoleContainer'));

function App({isAuth, getUserData}) {

    React.useEffect(() => {
        if(isAuth) {
            getUserData()
        }
    }, [isAuth])

return (
    <div className="app">
        {
            !isAuth ?
                <LoginPage />
                :
                <Suspense fallback={<div>Loading...</div>}>
                    <ConsoleContainer />
                </Suspense>
        }
    </div>
);
}

const mapStateTopProps = ({auth}) => ({
    isAuth: auth.isAuth,
});

export default connect(mapStateTopProps, {getUserData})(App);
