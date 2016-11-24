import React from 'react';
import {Route, IndexRoute,} from 'react-router';
import App from './containers/app.jsx';
import Promo from './containers/components/promo.jsx';
import PromoDetail from './containers/components/promoDetail.jsx';
import Notfound from './containers/components/notfound.jsx';

export default(
    <Route path="/" component={App}>
        <IndexRoute component={Promo}/>

        <Route path="/promo/detail/:id_promo" component={PromoDetail}/>
        <Route path="/promo" component={Promo}>
            <Route path="/promo/:kategori/:bank" component={Promo}/>
            <Route path="/promo/:kategori" component={Promo}/>
        </Route>
        <Route path="*" component={Notfound}/>
    </Route>
);
