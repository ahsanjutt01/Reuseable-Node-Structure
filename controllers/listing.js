
const listingHelper = require('../_helpers/listingHelper');

exports.getMyListing = (req, res, next) => {
    const user = req.jwtOptions.user;
    listingHelper.getMyListing(user).then(lisings => {
        return res.status(200).json({lisings: lisings});
    });
}

exports.getAllListingForClients = (req, res, next) => {
    const user = req.jwtOptions.user;
    listingHelper.getAllListingForClients(user).then(listings => {
        return res.status(200).json({listings: listings});
    });
}

exports.getListingByCatgories = (req, res, next) => {
    const user = req.jwtOptions.user;
    const catagoryId = req.query.catagoryId;
    listingHelper.getListingByCatgories(user, catagoryId).then(listings => {
        return res.status(200).json({listings: listings});
    });
}

exports.getListingByCatgoriesBeforeLogin = (req, res, next) => {
    // const user = req.jwtOptions.user;
    // const catagoryId = req.query.catagoryId;
    const { filters, isWillingToPayShipingCharges, isWillingToMeet } = req.body;
    console.log('CatagoryIds:.....>>>>>', filters,
    'isWillingToPayShipingCharges======', filters.isWillingToPayShipingCharges,
    'isWillingToMeet===', filters.isWillingToMeet);
    
    listingHelper.getListingByCatgoriesBeforeLogin(
        filters, filters.isWillingToPayShipingCharges, filters.isWillingToMeet
        ).then(listings => {
        return res.status(200).json({listings: listings});
    });
}

exports.getAllListingForClientsBeforeLogin = (req, res, next) => {
    listingHelper.getAllListingForClientsBeforeLogin().then(listings => {
        return res.status(200).json({listings: listings});
    });
}
