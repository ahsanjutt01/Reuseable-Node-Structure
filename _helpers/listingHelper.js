const { Op } = require("sequelize");


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

exports.getAllListing = () => {
    return Listing.findAll({where: {isActive: true}, include: ['listingImages']});
}

exports.getMyListing = (user) => {
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
        var resultValue = this.checkFilterType(title,titleType.toLowerCase())
        return Listing.findAll({where: {title: {[Op.like]: resultValue}}, include: ['listingImages']});
    } else if(title == "" && email != "" && catID == 0 && state.toLowerCase() == "any") {
        var emailResult = this.checkFilterType(email, emailType);
        return Listing.findAll({include: [{model: User, where: {email: {[Op.like]: emailResult}}}]});
    } else if(title != "" && email != "" && catID == 0 && state.toLowerCase() == "any") {
        var titleResult = this.checkFilterType(title, titleType.toLowerCase());
        var emailResult = this.checkFilterType(email, emailType.toLowerCase());
        return Listing.findAll({where: {title: {[Op.like]: titleResult}}, include: [{model:User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']});
    } else if(title !="" && email!="" && catID !=0 && state.toLowerCase() == "any") {
        var titleResult = this.checkFilterType(title, titleType);
        var emailResult = this.checkFilterType(email, emailType);
        return Listing.findAll({where: {title: {[Op.like]: titleResult}, catagoryId: catID}, include: [{model: User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']})
    } else if(title !="" && email!="" && catID ==0 && state.toLowerCase() != "any") {
        var titleResult = this.checkFilterType(title, titleType);
        var emailResult = this.checkFilterType(email, emailType);
        return Listing.findAll({where: {title: {[Op.like]: titleResult}, state: state}, include: [{model: User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']});
    } else if(title =="" && email=="" && catID ==0 && state.toLowerCase() != "any") {
        return Listing.findAll({where: {state: state}, include: ['listingImages']});
    } else if(title =="" && email=="" && catID !=0 && state.toLowerCase() == "any") {
        return Listing.findAll({where: {state: state}, include: ['listingImages']});
    } else if(title =="" && email=="" && catID !=0 && state.toLowerCase() != "any") {
        return Listing.findAll({where: {state: state, catagoryId: catID}, include: ['listingImages']});
    } else if(title =="" && email!="" && catID ==0 && state.toLowerCase() != "any") {
        var emailResult = this.checkFilterType(email, emailType);
        return Listing.findAll({where: {state: state}, include: [{model: User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']});
    } else if(title =="" && email!="" && catID !=0 && state.toLowerCase() == "any") {
        var emailResult = this.checkFilterType(email, emailType);
        return Listing.findAll({where: {catagoryId: catID}, include: [{model: User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']});
    } else if(title =="" && email!="" && catID !=0 && state.toLowerCase() != "any") {
        var emailResult = this.checkFilterType(email, emailType);
        return Listing.findAll({where: {state: state , catagoryId: catID}, include: [{model: User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']});
    } else if(title !="" && email=="" && catID ==0 && state.toLowerCase() != "any") {
        var titleResult = this.checkFilterType(title, titleType);
        return Listing.findAll({where: {title: {[Op.like]: titleResult} ,state: state}});
    } else if(title !="" && email=="" && catID !=0 && state.toLowerCase() == "any") {
        var titleResult = this.checkFilterType(title, titleType);
        return Listing.findAll({where: {title: {[Op.like]: titleResult} ,catagoryId: catID}});
    }  else if(title !="" && email=="" && catID !=0 && state.toLowerCase() != "any") {
        var titleResult = this.checkFilterType(title, titleType);
        return Listing.findAll({where: {title: {[Op.like]: titleResult}, state: state ,catagoryId: catID}});
    } else {
        var titleResult = this.checkFilterType(title, titleType);
        var emailResult = this.checkFilterType(email, emailType);
        console.log(titleResult, emailResult);
        return Listing.findAll({where: {title: {[Op.like]: titleResult}, state: state , catagoryId: catID}, include: [{model: User, where: {email: {[Op.like]: emailResult}}}], include: ['listingImages']});
    }
}

exports.checkFilterType = (value,filterType) => {
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

exports.getAllListingForClients = (user) => {
    return Listing.findAll({where: {isActive: true}, include: ['listingImages']}).then(listing => {
        listing = listing.filter(x => x.userId !== user.id);
        return listing;
    }).catch(err => console.log('Error in hellper methord getListingByCatgories', err))
    // return Listing.findAll({where: {userId: user.id, isActive: true}, include: ['listingImages']});
}
exports.findOne = (id, user) => {
    return Listing.findAll({where: {id: id, isActive: true}, include: ['listingImages']});
}

exports.getListingByCatgories = (user, catagoryId) => {
    return Listing.findAll({where: {isActive: true}, include: ['listingImages']}).then(listing => {
        listing = listing.filter(x => (x.userId !== user.id && (x.catagoryId == catagoryId && x.catagoryId !== null)));
        return listing;
    }).catch(err => console.log('Error in helper methord getListingByCatgories', err))
}

exports.getListingByCatgoriesBeforeLogin = (filter, isWillingToPayShipingCharges, isWillingToMeet) => {
    // return Listing.findAll({where: {isActive: true}, include: ['listingImages']}).then(listing => {
    //     listing = listing.filter(x => (x.catagoryId == catagoryId && x.catagoryId !== null));
    //     return listing;
    // }).catch(err => console.log('Error in helper methord getListingByCatgories', err))

    const filters = [];
    if(filter.catagoryIds !== null && filter.catagoryIds !== undefined && filter.catagoryIds.length > 0){
        filter.catagoryIds.forEach(element => {
            if(element !== null && element !== undefined) {
                filters.push({ catagoryId: {$eq: element.id}});
            }
        });
    }
    const zipcodeFilter = [];
    if (filter.zipcodes !== null && filter.zipcodes !== undefined && filter.zipcodes.length > 0) {
        filter.zipcodes.forEach(element => {
            if(element !== null && element !== undefined) {
                zipcodeFilter.push({ zipcode: {$eq: element.zipcode}});
            }
        });
    }
    
    console.log('>>>>>>>>>>>>>>>>', filters);
    console.log('>>>>>>>>>>>>>>>>ZIPCODE>>>>>>>>.', zipcodeFilter);

    // if(zipcodeFilter.length > 0) {
    //      console.log('ZIPCODE RUNS >>>>>>>>>>>>>>>>>>>>>>>>>>>>.', filter.zipcodes[0].zipcode)
    //     return Listing.findAll( { where: {isActive: true, $and: filters,
    //         isWillingToPayShipingCharges: isWillingToPayShipingCharges
    //     },include: [{
    //         model: User, 
    //         where: { zipcode: '61001'}
    //     }], include: ['listingImages']});
    // }
    if (isWillingToPayShipingCharges !== null && isWillingToPayShipingCharges !== undefined
        && isWillingToMeet !== null && isWillingToMeet !== undefined) {
            console.log('RUN isWillingToMeet and isWillingToPayShipingCharges>>>>>>>>>>>>>>>>>>>>')
        return Listing.findAll({where: {isActive: true, $or: filters, isWillingToPayShipingCharges: isWillingToPayShipingCharges}, include: ['listingImages']});
    }

    if (isWillingToPayShipingCharges!== null && isWillingToPayShipingCharges !== undefined) {
        console.log('RUN isWillingToPayShipingCharges>>>>>>>>>>>>>>>>>>>>', isWillingToPayShipingCharges)
        
        return Listing.findAll({where: {isActive: true, $or: filters, isWillingToPayShipingCharges: isWillingToPayShipingCharges}, include: ['listingImages']});

    }
    if (isWillingToMeet !== null && isWillingToMeet !== undefined) {
        console.log('RUN isWillingToMeet>>>>>>>>>>>>>>>>>>>>', isWillingToPayShipingCharges)

        return Listing.findAll({where: {isActive: true, $or: filters, isWillingToMeet: isWillingToMeet}, include: ['listingImages']});
    }
    console.log('Only Fillters Can Run');
    return Listing.findAll({where: {isActive: true, $or: filters}, include: ['listingImages']});
}

exports.getAllListingForClientsBeforeLogin = () => {
    return Listing.findAll({where: {isActive: true}, include: ['listingImages']});
    // return Listing.findAll({where: {userId: user.id, isActive: true}, include: ['listingImages']});
}

// Search listing by Name 
exports.getSearchByName = (title) => {
    console.log("SEARCH BY NAME::::::?=======", title)
    return Listing.findAll({where: {isActive: true, title: { $like: `%${title}%` }}, include: ['listingImages']});
}