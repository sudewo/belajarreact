import React from 'react';
import {Link} from 'react-router';
import config from '../../utils/config.js';

export default class PromoDetail extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            items: {}
        }
    }

    fetchData(id)
    {
        var query = config.api + '?id_promo=' + id;
        var self = this;
        fetch(query).then((response) => response.json()).then((item) => {
            if (item.status == 'FOUND')
                self.setState({items: item.data[0]})

        }).catch((err) => console.log('err', err));
    }

    componentWillReceiveProps(nextProps, nextState) {
        if ((this.props.params.id_promo != nextProps.params.id_promo)) {
            this.fetchData(nextProps.params.id_promo);
        }
    }

    componentDidMount() {
        this.fetchData(this.props.params.id_promo);
    }

    render() {
        let item = this.state.items;
        if (item.length == 0) {
            return (
                <div id="loading" className="box-shadow">sedang menampilkan data</div>
            )
        } else {
            let desc = (item.description)
            // console.log(desc);

            return (
                <div className="container">
                    <div style={{
                        textAlign: 'center'
                    }}>
                        <h2>{item.title}</h2>
                        <br/>
                        <img src={item.img}/>
                    </div>
                    <br/>
                    <br/>
                    <div dangerouslySetInnerHTML={{
                        __html: desc
                    }}></div>

                    <div>
                        <a href={item.url} target="_blank">sumber</a>
                    </div>
                    <br/>
                    <br/>
                </div>
            );
        }

    }
}

PromoDetail.contextTypes = {
    router: React.PropTypes.object.isRequired
}
