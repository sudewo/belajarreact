import React from 'react';
import ReactDom from 'react-dom';

class Hello extends React.Component {
    render() {
        return (
            <div>Hello {this.props.title}</div>
        );
    }
}

Hello.propTypes = {
    title: React.PropTypes.string
}

Hello.defaultProps = {
    title: 'World'
}
/*function Hello() {
    return (
        <div>Hello {this.props.title}</div>
    );
}*/
// var hello = React.createElement('div', null, 'hello world');
ReactDom.render(
    <Hello title="mike"/>, document.getElementById('app'));
