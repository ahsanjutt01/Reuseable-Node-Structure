const Listing = require('../models/listing');
const User = require('../models/user');
const { Op } = require("sequelize");
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
    }).catch(err => console.log('ERROR ================== ',err));
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

exports.getAllListing = (user) => {
    return user.getListings({where: {isActive: true}, include: ['listingImages']});
    // return Listing.findAll({where: {isActive: true}, include: [{ all: true, nested: true }]});
}

const getAllListings = () => {
    return Listing.findAll();
}



exports.getFilterListing = (title, titleType, email, emailType, catID, state, user) => {
    console.log(title,titleType,email,emailType,catID, state);
    if(title == "" && email == "" && catID == 0 && state.toLowerCase() == "any") {
        return getAllListings();
    } else if(title != "" && email == "" && catID == 0 && state.toLowerCase() == "any") {
        var resultValue = checkFilterType(title,titleType.toLowerCase())
        if(resultValue != title) {
            return Listing.findAll({where: {title: {[Op.like]: resultValue}}, include: ['listingImages']});
        } else {
            return Listing.findAll({where: {title: resultValue}, include: ['listingImages']});
        }
    } else if(title == "" && email != "" && catID == 0 && state.toLowerCase() == "any") {
        var emailResult = checkFilterType(email, emailType);
        if(emailResult != email) {
            return Listing.findAll({include: [{model: User, where: {email: {[Op.like]: emailResult}}}]});
        } else {
            return Listing.findAll({include: [{model: User, where: {email: emailResult}}]});
        }
    } else if(title != "" && email != "" && catID == 0 && state.toLowerCase() == "any") {
        var titleResult = checkFilterType(title, titleType.toLowerCase());
        var emailResult = checkFilterType(email, emailType.toLowerCase());
        if(title!= titleResult && emailResult != email) {
            return Listing.findAll({where: {title: {[Op.like]: titleResult}}, include: [{model:User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']});
        } else if(title == titleResult && emailResult!=email) {
            return Listing.findAll({where: {title: titleResult}, include: [{model: User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']});
        } else if(title != titleResult && email == emailResult) {
            return Listing.findAll({where: {title: {[Op.like]: titleResult}}, include: [{model: User, where: {email: emailResult}}], include: ['listingImages']});
        } else {
            return Listing.findAll({where: {title: titleResult}, include: [{model: User, where: {email: emailResult}}], include: ['listingImages']});
        }
    } else if(title !="" && email!="" && catID !=0 && state.toLowerCase() == "any") {
        var titleResult = checkFilterType(title, titleType);
        var emailResult = checkFilterType(email, emailType);
        if(title != titleResult && email != emailResult) {
            return Listing.findAll({where: {title: {[Op.like]: titleResult}, catagoryId: catID}, include: [{model: User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']})
        }else if(title == titleResult && email != emailResult) {
            return Listing.findAll({where: {title: titleResult, catagoryId: catID}, include: [{model: User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']});
        } else if(title != titleResult && email == emailResult) {
            return Listing.findAll({where: {title: {[Op.like]: titleResult}, catagoryId: catID}, include: [{model: User, where: {email: emailResult}}], include: ['listingImages']});
        } else {
            return Listing.findAll({where: {title: titleResult, catagoryId: catID}, include: [{model: User, where: {email: emailResult}}], include: ['listingImages']});
        }
    } else if(title !="" && email!="" && catID ==0 && state.toLowerCase() != "any") {
        var titleResult = checkFilterType(title, titleType);
        var emailResult = checkFilterType(email, emailType);
        if(title != titleResult && email != emailResult) {
            return Listing.findAll({where: {title: {[Op.like]: titleResult}, state: state}, include: [{model: User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']})
        }else if(title == titleResult && email != emailResult) {
            return Listing.findAll({where: {title: titleResult, state: state}, include: [{model: User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']});
        } else if(title != titleResult && email == emailResult) {
            return Listing.findAll({where: {title: {[Op.like]: titleResult}, state: state}, include: [{model: User, where: {email: emailResult}}], include: ['listingImages']});
        } else {
            return Listing.findAll({where: {title: titleResult, state: state}, include: [{model: User, where: {email: emailResult}}], include: ['listingImages']});
        }
    } else if(title =="" && email=="" && catID ==0 && state.toLowerCase() != "any") {
        return Listing.findAll({where: {state: state}, include: ['listingImages']});
    } else if(title =="" && email=="" && catID !=0 && state.toLowerCase() == "any") {
        return Listing.findAll({where: {state: state}, include: ['listingImages']});
    } else if(title =="" && email=="" && catID !=0 && state.toLowerCase() != "any") {
        return Listing.findAll({where: {state: state, catagoryId: catID}, include: ['listingImages']});
    } else if(title =="" && email!="" && catID ==0 && state.toLowerCase() != "any") {
        var emailResult = checkFilterType(email, emailType);
        if(email != emailResult) {
            return Listing.findAll({where: {state: state}, include: [{model: User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']});
        } else {
            return Listing.findAll({where: {state: state}, include: [{model: User, where: {email: emailResult}}], include: ['listingImages']});
        }
    } else if(title =="" && email!="" && catID !=0 && state.toLowerCase() == "any") {
        var emailResult = checkFilterType(email, emailType);
        if(email != emailResult) {
            return Listing.findAll({where: {catagoryId: catID}, include: [{model: User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']});
        } else {
            return Listing.findAll({where: {catagoryId: catID}, include: [{model: User, where: {email: emailResult}}], include: ['listingImages']});
        }
    } else if(title =="" && email!="" && catID !=0 && state.toLowerCase() != "any") {
        var emailResult = checkFilterType(email, emailType);
        if(email != emailResult) {
            return Listing.findAll({where: {state: state , catagoryId: catID}, include: [{model: User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']});
        } else {
            return Listing.findAll({where: {state: state ,catagoryId: catID}, include: [{model: User, where: {email: emailResult}}], include: ['listingImages']});
        }
    } else if(title !="" && email=="" && catID ==0 && state.toLowerCase() != "any") {
        var titleResult = checkFilterType(title, titleType);
        if(title != titleResult) {
            return Listing.findAll({where: {title: {[Op.like]: titleResult} ,state: state}});
        } else {
            return Listing.findAll({where: {title: titleResult ,state: state}});
        }
    } else if(title !="" && email=="" && catID !=0 && state.toLowerCase() == "any") {
        var titleResult = checkFilterType(title, titleType);
        if(title != titleResult) {
            return Listing.findAll({where: {title: {[Op.like]: titleResult} ,catagoryId: catID}});
        } else {
            return Listing.findAll({where: {title: titleResult ,catagoryId: catID}});
        }
    }  else if(title !="" && email=="" && catID !=0 && state.toLowerCase() != "any") {
        var titleResult = checkFilterType(title, titleType);
        if(title != titleResult) {
            return Listing.findAll({where: {title: {[Op.like]: titleResult}, state: state ,catagoryId: catID}});
        } else {
            return Listing.findAll({where: {title: titleResult, state: state ,catagoryId: catID}});
        }
    } else {
        var titleResult = checkFilterType(title, titleType);
        var emailResult = checkFilterType(email, emailType);
        console.log(titleResult, emailResult);
        if(title != titleResult && email != emailResult) {
            // console.log(Listing.findAll({where: {title: {[Op.like]: titleResult}, state: state , catagoryId: catID}, include: ['listingImages']}));
            return Listing.findAll({where: {title: {[Op.like]: titleResult}, state: state , catagoryId: catID}, include: [{model: User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']});
        }else if(title == titleResult && email != emailResult) {
            return Listing.findAll({where: {title: titleResult, state: state, catagoryId: catID}, include: [{model: User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']});
        } else if(title != titleResult && email == emailResult) {
            return Listing.findAll({where: {title: {[Op.like]: titleResult}, state: state, catagoryId: catID}, include: [{model: User, where: {email: emailResult}}], include: ['listingImages']});
        } else {
            return Listing.findAll({where: {title: titleResult, state: state, catagoryId: catID}, include: [{model: User, where: {email: emailResult}}], include: ['listingImages']});
        }
    }
}

checkFilterType = (value,filterType) => {
    switch(filterType) {
        case "contains": {
            return '%'+value+'%';
        }
        case "equals": {
            return value;
        }
        case "starts with": {
            return value + '%';
        }
        case "ends with": {
            return '%'+value;
        }
        default: {
            break;
        }
    }
}

exports.findOne = (id, user) => {
    return Listing.findAll({where: {id: id, isActive: true}, include: ['listingImages']});
}