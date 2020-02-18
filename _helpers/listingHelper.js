const Listing = require('../models/listing');
const User = require('../models/user');
exports.createListing = (
    user,
    title,
    desciption,
    isFree,
    price,
    date,
    isWillingToPayShipingCharges,
    isWillingToMeet,
    state,
    isActiveListing,
    condition,
    imageUrls,
    catagoryId
) => {
    return user.createListing({
        title: title,
        desciption: desciption,
        isFree: isFree,
        price: price,
        date: date,
        isWillingToPayShipingCharges: isWillingToPayShipingCharges,
        isWillingToMeet: isWillingToMeet,
        state: state,
        isActiveListing: isActiveListing,
        condition: condition,
        catagoryId: catagoryId,
        isActive: true
    }).then( listing => {
        if(imageUrls.length > 0) {
            imageUrls.forEach(element => {
                listing.createListingImage({url: element.url, isActive: true});
            });
        }
            return listing;
    }).catch(err => console.log('ERROR =========================== ',err));
}

exports.updateListing  = (
    id,
    title,
    desciption,
    isFree,
    price,
    date,
    isWillingToPayShipingCharges,
    isWillingToMeet,
    state,
    isActiveListing,
    condition,
    catagoryId
) => {
    return Listing.findOne({where: {id: id, isActive: true}}).then(listing => {
        listing.title = title;
        listing.description = desciption;
        listing.isFree = isFree;
        listing.price = price;
        listing.date = listing.date;
        listing.isWillingToPayShipingCharges = isWillingToPayShipingCharges;
        listing.isWillingToMeet = isWillingToMeet;
        listing.state = state;
        listing.isActiveListing = isActiveListing;
        listing.condition = condition;
        listing.catagoryId = catagoryId;
        return listing.save();
    }).catch(err => console.log(err));
}

exports.getAllListing = () => {
    return Listing.findAll({where: {isActive: true}, include: ['listingImages']});
}

exports.getMyListing = (user) => {
    return user.getListings({where: {isActive: true}, include: ['listingImages']});
}

exports.getAllListingForClients = (user) => {
    return Listing.findAll({where: {isActive: true}, include: ['listingImages']}).then(listing => {
        listing = listing.filter(x => x.userId !== user.id);
        return listing;
    }).catch(err => console.log('Error in hellper methord getListingByCatgories', err))
    // return Listing.findAll({where: {userId: user.id, isActive: true}, include: ['listingImages']});
}
exports.findOne = (id, user) => {
    return user.getListings({where: {id: id, isActive: true}, include: ['listingImages']});
}

exports.getListingByCatgories = (user, catagoryId) => {
    return Listing.findAll({where: {isActive: true}, include: ['listingImages']}).then(listing => {
        listing = listing.filter(x => (x.userId !== user.id && (x.catagoryId == catagoryId && x.catagoryId !== null)));
        return listing;
    }).catch(err => console.log('Error in helper methord getListingByCatgories', err))
}