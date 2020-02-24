
const listingHelper = require('../_helpers/listingHelper');
const ListingImage = require('../models/listingImages');

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
    const { filters } = req.body;
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

exports.getSearchByName = (req, res, next) => {
    const { title } = req.query;

    listingHelper.getSearchByName(title).then( listings => {
        return res.status(200).json({listings: listings});
    }).catch(err => res.status(200).json({error: err}));
    
}


// update user

exports.updateUser = (req, res, next) => {
    const user = req.jwtOptions.user;
    const { firstName, lastName, email, zipCode } = req.body;

    user.email = email;
    user.firstName = firstName; 
    user.lastName = lastName;
    user.zipCode = zipCode;

    user.save().then(() => {
        return res.status(200).json({msg: 'user profile is updated successfully'});
    }).catch(err => {
        return res.status(500).json({errors: 'E rror in user profile updating ', err});
        
    })

}