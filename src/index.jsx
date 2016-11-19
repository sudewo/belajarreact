import React from 'react';
import ReactDom from 'react-dom';

class Header extends React.Component {
    render() {
        return (
            <h2>
                {this.props.title}
            </h2>
        );
    }
}

Header.propTypes = {
    title: React.PropTypes.string
}

Header.defaultProps = {
    title: 'Keranjang'
}

class Cart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: [],
            text: '',
            header: 'Keranjang Belanja'
        }
    }

    addItem() {
        let newItem = {
            text: this.state.text
        }

        this.setState((prevState) => ({items: prevState.items.concat(newItem), text: ''}))
    }

    handleInput(e) {
        this.setState({"text": e.target.value})
    }

    componentDidUpdate() {
        console.log(this.state.items);
    }

    render() {
        return (
            <div>
                <Header title="Keranjang Belanja"/>
                <input type="text" value={this.state.text} onChange={this.handleInput.bind(this)}/>
                <button onClick={this.addItem.bind(this)}>add item</button>
                <br/>
                <ul>
                    {this.state.items.map((item, i) => {
                        return (
                            <li key={i}>{item.text}</li>
                        )
                    })
}
                </ul>
            </div>
        )
    }
}

ReactDom.render(
    <Cart/>, document.getElementById('app'));;
