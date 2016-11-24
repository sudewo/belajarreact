import React from 'react';
import {Link} from 'react-router';

class Autocomplete extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            'keyword': '',
            'items': [],
            'activeList': ''
        }

        this.handleSearch = this.handleSearch.bind(this);
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
        return (
            <form className="col-xs-10 col-lg-11 col-sm-11 col-md-11 resetspace">
                <input className="form-control box-shadow" type="text" placeholder="Search Promo" value={this.state.keyword} onChange={this.handleSearch} onKeyDown={this.handleSearchKeyDown}/>
                <i className={'fa fa-times ' + (this.state.keyword > 0)
                    ? ' close-search '
                    : ' hidden'} aria-hidden="true"></i>

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
                <Link to="/promo/kartukredit/bca">BCA</Link>
            </li>
            <li>
                <Link to="/promo/kartukredit/bni">BNI</Link>
            </li>
            <li>
                <Link to="/promo/kartukredit/mandiri">MANDIRI</Link>
            </li>
            <li>
                <Link to="/promo/kartukredit/maybank">MAYBANK</Link>
            </li>
            <li>
                <Link to="/promo/kartukredit/danamon">DANAMON</Link>
            </li>
            <li>
                <Link to="/promo/kartukredit/anz">ANZ</Link>
            </li>
            <li>
                <Link to="/promo/kartukredit/bjb">BJB</Link>
            </li>
            <li>
                <Link to="/promo/banner">WEB PROMO</Link>
            </li>
        </ul>
    )
}

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-light bg-faded box-shadow">
            <div className="container samewidthcontent">
                <div className="row">
                    <span className="col-xs-2 col-lg-1 col-sm-1 col-md-1 tooglespace" onClick={props.handleSidebar}>
                        <button className="navbar-toggler"></button>
                    </span>
                    <Autocomplete fetchUrl="http://api.liatdiskon.dev?keyword="/>
                </div>
            </div>
        </nav>
    )
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'sidebarToogle': 'disable animate'
        }
        this.handleSidebar = this.handleSidebar.bind(this);
    }

    handleSidebar() {
        let state = (this.state.sidebarToogle == 'disable animate')
            ? 'enable animate'
            : 'disable animate';
        this.setState({'sidebarToogle': state});
    }

    render() {
        return (
            <div>
                <Sidebar toogle={this.state.sidebarToogle}/>
                <div className={'wp ' + this.state.sidebarToogle}>
                    <Navbar handleSidebar={this.handleSidebar}/>
                    <div id="content" className="container">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
