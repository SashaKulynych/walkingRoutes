import React from 'react';
import ReactDom from 'react-dom';
import PageTransition from 'react-router-page-transition';

export default class Home extends React.Component {
    render() {
        return (
            <div>
                <PageTransition>
                    {this.props.children}
                </PageTransition>
            </div>
        );
    }
}