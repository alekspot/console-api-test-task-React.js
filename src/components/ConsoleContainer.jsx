import React from 'react';
import {connect} from 'react-redux';
import History from './History/History';
import Header from './Header/Header';
import {requestLogout, performRequest, setRequest} from '../redux/actions';
import SplitView from './SplitView/SplitView';
import {Footer} from './Footer/Footer';
import {Format} from '../utils';
import RequestContainer from './Request/RequestContainer';
import ResponseContainer from './Response/ResponseContainer';

const ConsoleContainer = (props) => {
    const {account, requestLogout, setRequest, requestValue, performRequest} = props;

    const onSubmit = () => {
        performRequest();
    };

    const onFormat = () => {
        setRequest(Format.formatJSON(JSON.parse(requestValue)));
    };

    return (<div className="console-container">
        <Header account={account} onLogout={requestLogout}/>
        <History/>
        <SplitView>
            <RequestContainer/>
            <ResponseContainer/>
        </SplitView>
        <Footer onSubmit={onSubmit} onFormat={onFormat}/>
    </div>
    );
};

const mapStateTopProps = ({requestState, auth}) => ({
    requestValue: requestState.request.value,
    account: {account: auth.account, sublogin: auth.sublogin}
});


export default connect(mapStateTopProps, {requestLogout, performRequest, setRequest})(ConsoleContainer);