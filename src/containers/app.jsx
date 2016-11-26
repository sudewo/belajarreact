import React from 'react';
import ReactDom from 'react-dom';
import {Link} from 'react-router';
import config from '../utils/config.js';

class Autocomplete extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            'keyword': '',
            'items': [],
            'activeList': ''
        }

        this.handleSearch = this.handleSearch.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
        this.handleSearchKeyDown = this.handleSearchKeyDown.bind(this);
    }

    handleSearchKeyDown(e) {
        if (e.key == 'Escape') {
            this.setState({'keyword': '', 'items': [], 'activeList': ''});
        }

        if (e.key == 'Enter') {
            let itemSelected = this.state.items[this.state.activeList];
            if (typeof(itemSelected) != "undefined") {
                this.setState({'items': [], 'activeList': ''});
                this.context.router.push('/promo/detail/' + itemSelected['id_promo']);
                // window.open(itemSelected['url'], '_blank');
            }
            e.preventDefault();
        }

        if (e.key == 'ArrowDown') {
            if (typeof(this.state.activeList) == 'string') {
                var activeList = 0;
            } else {
                var countSearchResult = this.state.items.length;
                var activeList = (this.state.activeList < (countSearchResult - 1))
                    ? this.state.activeList + 1
                    : 0;
            }
            this.setState({'activeList': activeList});
        }

        if (e.key == 'ArrowUp') {
            if (typeof(this.state.activeList) == 'string') {
                var activeList = 0;
            } else {
                if (this.state.activeList <= 0)
                    return false;

                var countSearchResult = this.state.items.length;
                var activeList = (this.state.activeList < (countSearchResult - 1))
                    ? this.state.activeList - 1
                    : 0;
            }
            this.setState({'activeList': activeList});
        }
    }

    handleSearch(e) {

        this.setState({'keyword': e.target.value});
        if (e.target.value.length >= 3) {
            this.fetchData(this.state.keyword);
        } else {
            this.setState({'items': []});
        }
    }

    clearSearch() {
        this.setState({'keyword': '', 'items': [], 'activeList': ''});
    }

    handleClickSearch(item) {
        this.setState({'keyword': '', 'items': [], 'activeList': ''});
        this.context.router.push('/promo/detail/' + item.id_promo);

    }

    fetchData(keyword) {
        if (typeof(keyword) != "undefined") {
            let url = this.props.fetchUrl + keyword;
            let self = this;
            fetch(url).then((response) => response.json()).then((item) => {
                self.setState({items: item.data})
            }).catch((err) => console.log('err', err));
        } else {
            return false;
        }
    }

    render() {
        // console.log('keyword', this.state.keyword);
        return (

            <form className="col-xs-10 col-lg-11 col-sm-11 col-md-11 resetspace">
                <input className="form-control box-shadow" type="text" placeholder="Search Promo" value={this.state.keyword} onChange={this.handleSearch} onKeyDown={this.handleSearchKeyDown}/>
                <i className={(this.state.keyword.length == 0)
                    ? 'fa fa-times hidden'
                    : 'fa fa-times close-search'} aria-hidden="true" onClick={this.clearSearch}></i>
                <ul className="autocomplete">
                    {this.state.items.map((item, key) => {
                        return (
                            <li key={key}>
                                <a onClick={this.handleClickSearch.bind(this, item)} target="_blank" className={(typeof(this.state.activeList) == 'number' && this.state.activeList == key)
                                    ? 'activelist'
                                    : ''}>
                                    <img src={item.img}/>
                                    <p>{item.title}</p>
                                </a>
                            </li>
                        )
                    })
}
                </ul>
            </form>
        )
    }
}

Autocomplete.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const Sidebar = (props) => {

    return (
        <ul className={'sidebar ' + props.toogle}>
            <li>
                <Link to="/promo/kartukredit/bca" onClick={props.click}>BCA</Link>
            </li>
            <li>
                <Link to="/promo/kartukredit/bni" onClick={props.click}>BNI</Link>
            </li>
            <li>
                <Link to="/promo/kartukredit/mandiri" onClick={props.click}>MANDIRI</Link>
            </li>
            <li>
                <Link to="/promo/kartukredit/maybank" onClick={props.click}>MAYBANK</Link>
            </li>
            <li>
                <Link to="/promo/kartukredit/danamon" onClick={props.click}>DANAMON</Link>
            </li>
            <li>
                <Link to="/promo/kartukredit/anz" onClick={props.click}>ANZ</Link>
            </li>
            <li>
                <Link to="/promo/kartukredit/bjb" onClick={props.click}>BJB</Link>
            </li>
            <li>
                <Link to="/promo/banner" onClick={props.click}>WEB PROMO</Link>
            </li>
        </ul>
    )
}

const Navbar = (props) => {
    const API_URL = config.api + '?keyword=';
    return (
        <nav className="navbar navbar-light bg-faded box-shadow">
            <div className="container samewidthcontent">
                <div className="row">
                    <span className="col-xs-2 col-lg-1 col-sm-1 col-md-1 tooglespace" onClick={props.handleSidebar}>
                        <button className="navbar-toggler box-shadow"></button>
                    </span>
                    <Autocomplete fetchUrl={API_URL}/>
                </div>
            </div>
        </nav>
    )
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'sidebarToogle': 'disable animate',
            'width': 0,
            'height': 0
        }
        this.handleSidebar = this.handleSidebar.bind(this);
    }

    handleSidebar() {
        let state = (this.state.sidebarToogle == 'disable animate')
            ? 'enable animate'
            : 'disable animate';
        this.setState({'sidebarToogle': state});
    }

    click() {
        let ctr = ReactDom.findDOMNode(this.refs.ctr).clientWidth;
        if (ctr < 767) { //smartphone kebawah
            this.setState({'sidebarToogle': 'disable animate'});
        }
    }

    render() {
        return (
            <div>
                <Sidebar toogle={this.state.sidebarToogle} click={this.click.bind(this)}/>
                <div className={'wp ' + this.state.sidebarToogle}>
                    <Navbar handleSidebar={this.handleSidebar}/>
                    <div id="content" className="container" ref="ctr">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
