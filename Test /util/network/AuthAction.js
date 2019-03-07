import { Alert, Platform} from 'react-native';
import {getKeyValue, setKeyValue} from '../AsyncStorageUtil';
import constants from '../constants/index';
import AsyncStorageGetter from '../constants/AsyncStorageGetter';
import {LOGIN_SCREEN_TEXT} from "../constants/String";
import {ASYNC_STORAGE_CONSTANTS} from '../constants/AsyncStorageConstants';

var responseError = '';

const AuthAction = {
    login: async function (userObject) {
        responseError = '';

        let setupOption = await this.getSelectedServerOption();
        let getServer = await AsyncStorageGetter.getServer();
        console.log("setupOption",setupOption,getServer);

            let server = constants.defaultServerIP;

            let company = userObject.company.toUpperCase(),
                ip = getServer,
                stayLoggedIn = userObject.stayLoggedIn === true,
                wakAPI = 'http://' + ip + ":" + constants.wakandaPortNumber,
                loginUrl = wakAPI + '/login',
                uiSessionID = new Date().getTime().toString().substr(4);
            let res = await login(company, userObject, uiSessionID, stayLoggedIn, null, loginUrl);
            console.log("AUTH ACTION===", company, ip, stayLoggedIn, wakAPI, loginUrl, uiSessionID,res);
            let responseStatus = res.status;
            // responseStatus = true means login was successful
            if (responseStatus) {
                // save company to
                window.company = company;
                return {status: responseStatus, appDomain: null};
            }
            else {
                if (res.message != undefined) {
                   // Alert.alert("Error", res.message);
                }
                return {status: false, appDomain: null};
            }

    },
    emar_ResidentDetail: async function(providerObject, resNumbers){
        let //server = constants.defaultServerIP,
            server = await AsyncStorageGetter.getServer(),
            providerId = providerObject.Med_Provider_ID,
            ip = server,
            wakAPI = 'http://' + ip + ":" + constants.wakandaPortNumber,
            ResList_URL = wakAPI + '/emarAPI';
        //resNumbers = ["173","104"];
        if(providerId && !resNumbers){
            let res = await emarApi_ResidentList(providerId, ResList_URL)
            //console.log("Resident list through Api",res);
        }
       // if(providerId && resNumber){
       /* resNumbers.forEach(async function(resNumber){
            let res = await emarApi_ResidentScreen(providerId, resNumber, ResList_URL)
            console.log("Resident list through Api",res);
        })*/
            /*let res = await emarApi_ResidentScreen(providerId, resNumber, ResList_URL)
            console.log("Resident list through Api",res);*/
        //}

    },
    stayLoggedIn: async function () {
        let stayLoggedIn = await getKeyValue('stayLoggedIn')
        return stayLoggedIn === 'true';
    },

    getUISessionID: async function () {
        return getKeyValue('uiSessionID');
    },

    getUserID: async function () {
        return getKeyValue('userID');
    },

    getWakSessionID: async function () {
        return getKeyValue('wSessionID');
    },

    getCompany: async function () {
        return getKeyValue('company');
    },

    getUserName: async function () {
        return getKeyValue('userName');
    },
    getSelectedServerOption: async function () {
        return getKeyValue('selectedServerOption');
    },
    getAppDataCenter: async function (company) {
        return getKeyValue(company);
    },
    getCommunities: async function () {
        return getKeyValue("communities");
    }
};



async function emarApi_ResidentList(providerId, loginUrl) {

    return await fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "MedProviderId=" + providerId
    })
        .then(function (response) {
           // console.log("emarAPI : ",response);
            return response.json()
                .then((responseJson) => {
                console.log("EMAR API===",responseJson.status);
                    if (responseJson.status) {
                        return responseJson;
                    }
                    else {
                        if (responseJson.errorMsg !== undefined && responseJson.errorMsg !== "")
                            responseError = LOGIN_SCREEN_TEXT.ERROR_NO_ACCESS_TO_SCHEDULES;
                        else
                            responseError = responseJson.error;
                        return {message: responseError, status: false}
                    }
                })
        })
        .catch((error) => {
            console.log("loginError", error + "");
            responseError = "Error trying to login.";
            return {message: responseError, status: false};
        })
}


async function emarApi_ResidentScreen(providerId, resNumber, loginUrl) {

    return await fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "MedProviderId=" + providerId
        + "&Res_Number=" + "173"
    })
        .then(function (response) {
            console.log("emarAPI : ",response);
            return response.json()
                .then((responseJson) => {
                    console.log("EMAR API===",responseJson.status);
                    if (responseJson.status) {
                        return responseJson;
                    }
                    else {
                        if (responseJson.errorMsg !== undefined && responseJson.errorMsg !== "")
                            responseError = LOGIN_SCREEN_TEXT.ERROR_NO_ACCESS_TO_SCHEDULES;
                        else
                            responseError = responseJson.error;
                        return {message: responseError, status: false}
                    }
                })
        })
        .catch((error) => {
            console.log("loginError", error + "");
            responseError = "Error trying to login.";
            return {message: responseError, status: false};
        })
}









async function login(company, userObject, uiSessionID, stayLoggedIn, appDomainValue, loginUrl) {

    let argumentObject = {
        company: company,
        userObject: userObject,
        uiSessionID: uiSessionID,
        stayLoggedIn: stayLoggedIn,
        appDomainValue: appDomainValue,
        loginUrl: loginUrl
    };

    console.log("login => argumentObject", JSON.stringify(argumentObject));

    return await fetch(loginUrl, {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "userName=" + userObject.userName
        + "&password=" + userObject.password
        + "&communityId=" + company
        + "&uiSessionID=" + uiSessionID
        + "&timeZoneOffset=" + +new Date().getTimezoneOffset(),
    })
        .then(function (response) {
            return response.json()
                .then((responseJson) => {
                    if (responseJson.success) {
                        let wSessionID = responseJson.token;
                        if (wSessionID) {
                            console.log("@AuthAction => responseJson",JSON.stringify(responseJson));
                            // save credentials to AsyncStorage
                            setKeyValue('stayLoggedIn', true);
                            setKeyValue('uiSessionID', uiSessionID);
                            setKeyValue('wSessionID', wSessionID);
                            console.log("@login => saved_session_id", wSessionID + "_" + uiSessionID);
                            setKeyValue('profile', JSON.stringify(responseJson.user.profile));
                            console.log("@AuthAction => profile", JSON.stringify(responseJson.user.profile));
                            let profile = responseJson.user.profile;
                            if (profile.fullName) {
                                setKeyValue(ASYNC_STORAGE_CONSTANTS.USER_FULL_NAME, profile.fullName);
                            }
                            else {
                                setKeyValue(ASYNC_STORAGE_CONSTANTS.USER_FULL_NAME, '');
                            }
                            setKeyValue('userName', userObject.userName);
                            console.log("@AuthAction => userName", userObject.userName);
                            setKeyValue('company', company);
                            setKeyValue('appDomain', appDomainValue);
                            setKeyValue(company, appDomainValue);
                            setKeyValue('userID', responseJson.user.userID);
                            setKeyValue('serverTimezoneOffset', responseJson.serverTimezoneOffset);

                            // save list of communities to AsyncStorage
                            if (responseJson.user) {
                                console.log("company response===",responseJson.user)
                                if (responseJson.user.company) {
                                    /*let listOfCommunitiesAssignedToUser = [];*/
                                    let listOfCommunitiesAssignedToUser = getCommunities(responseJson.user.company);
                                    //console.log("Community data=====>",responseJson.user.company);
                                    console.log("AuthAction => communityList", JSON.stringify(listOfCommunitiesAssignedToUser))

                                    // if user has been assigned communities, save those communities in local storage.
                                    if (listOfCommunitiesAssignedToUser.length > 0) {
                                        setKeyValue('communities', JSON.stringify(listOfCommunitiesAssignedToUser));
                                    }
                                    // otherwise inform the user that he/she does not have access to schedules
                                    else {
                                        responseError = LOGIN_SCREEN_TEXT.ERROR_NO_ACCESS_TO_SCHEDULES;
                                        let message = responseJson.message;
                                        return {message: message, status: false};
                                        /*return false;*/
                                    }
                                }
                            }
                        }
                        return {message: "Success", status: true};
                    }
                    else {
                        if (responseJson.errorMsg !== undefined && responseJson.errorMsg !== "")
                            responseError = LOGIN_SCREEN_TEXT.ERROR_NO_ACCESS_TO_SCHEDULES;
                        else
                            responseError = responseJson.error;
                        return {message: responseError, status: false}
                    }
                })
        })
        .catch((error) => {
            console.log("login response Error", error + "");
            responseError = "Error trying to login.";
            return {message: responseError, status: false};
        })
}

function getCommunities(loggedUserCompany) {
    if (constants.isRegionListEnabled) {
        let regions = loggedUserCompany.regions;
        let comregions = [];
        let listCommunity = [];

        for (let index = 0; index < regions.length; index++) {
            let communities = regions[index].communities;
            let communityObject = [];
            for (let indexer = 0; indexer < communities.length; indexer++) {
                communityObject.push({id: communities[indexer].id, name: communities[indexer].name,
                    module_EMAR:communities[indexer].Module_EMAR});
            }
            communityObject = sortArray(communityObject);
            listCommunity.push({'title': regions[index].name, 'data': communityObject});
        }
        //communityObject.splice(0, 0, {id:'all', name:"All"});

        listCommunity = sortArrayTitle(listCommunity);
        //listCommunity.splice(0, 0, {'title': '', 'data': [{id: 'all', name: "All"}]});

        // writeToLog("getCommunities", JSON.stringify(listCommunity));
       // console.log("commmmmunity",listCommunity)
        return listCommunity;
    }
    else {
        let regions = loggedUserCompany.regions;
        let communityObject = [];

        for (let index = 0; index < regions.length; index++) {
            let communities = regions[index].communities;
            for (let indexer = 0; indexer < communities.length; indexer++) {
                communityObject.push({id: communities[indexer].id, name: communities[indexer].name,
                module_EMAR: communities[indexer].EMAR ? communities[indexer].EMAR: 0});
            }
        }
        communityObject.sort(function (a, b) {
            var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
            if (nameA < nameB) //sort string ascending
                return -1
            if (nameA > nameB)
                return 1
            return 0
        });
        //communityObject.splice(0, 0, {id: 'all', name: "All"});
        //console.log("commmmmunity else",regions,communityObject)
        return communityObject;
    }
}
function sortArray(array) {
    return array.sort(function (a, b) {
        var nameA = a.name.toLowerCase(), nameB = b.name.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1
        if (nameA > nameB)
            return 1
        return 0
    });
}

function sortArrayTitle(array) {
    return array.sort(function (a, b) {
        var nameA = a.title.toLowerCase(), nameB = b.title.toLowerCase()
        if (nameA < nameB) //sort string ascending
            return -1
        if (nameA > nameB)
            return 1
        return 0
    });
}

export default AuthAction;