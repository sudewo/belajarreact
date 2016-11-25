import React from 'react';
import fetch from 'isomorphic-fetch';
import {Link} from 'react-router';
import {serialize} from '../../utils/utils.js';
import config from '../../utils/config.js';

export default class Promo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        }
    }

    fetchData(params) {
        let queryString = (typeof(params) != "undefined")
            ? '?' + params
            : '';

        var query = config.api + queryString;
        var self = this;
        fetch(query).then((response) => response.json()).then((item) => {
            self.setState({items: item.data})
        }).catch((err) => console.log('err', err));
    }

    componentDidMount() {
        let queryString = serialize(this.props.params);
        this.fetchData(queryString);
    }

    componentWillReceiveProps(nextProps, nextState) {
        if ((this.props.params.bank != nextProps.params.bank) || (this.props.params.kategori != nextProps.params.kategori)) {
            let newState = Object.assign({}, this.state);
            let queryString = serialize(nextProps.params);
            this.fetchData(queryString);
        }
    }

    render() {
        console.log('promo here');
        return (

            <div className="card-columns">
                {this.state.items.map((item, key) => {

                    if (item.img != null) {
                        return (
                            <div key={key} className="card box-shadow">
                                <Link to={'/promo/detail/' + item.id_promo}>
                                    <img className="card-img-top img-fluid" alt="Card image cap" src={item.img}/>
                                    <div className="card-block">
                                        <h5 className="card-title">{item.title}</h5>

                                    </div>
                                </Link>
                            </div>
                        )
                    }
                })}
            </div>
        )
    }
}
