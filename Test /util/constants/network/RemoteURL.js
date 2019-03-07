const ENV_APP_STORE = "APP_STORE";
const ENV_TEST_FLIGHT = "TEST_FLIGHT";
const ENV_BACKOFFICE = "BACK_OFFICE";
const ENV_DUSTIN = false;
const ENV_MY = "MY_LOCAL";

const _ENV_ = ENV_TEST_FLIGHT;

const  SUB_DOMAIN = ['app', 'app2'];


//DEMO7 = https://app2.eldermark.com/api/graphql/crmdemo/graphql
//EBZCRM = https://app2.eldermark.com/api/graphql/ebzcrm/graphql
//RADIENTCRM = https://app.eldermark.com/api/graphql/RadiantCRM/graphql

var app     =   '%%app%%';
var graphQL =   '%%graphql%%';
var defaultCompany = 'ebzcrm';
var defaultAppDomain = 'app';

var ENV = {
    APP_STORE:
        {
            WAKANDA:'https://'+app+'.eldermark.com/api',
            UI:'https://'+app+'.eldermark.com',
            GRAPHQL:'https://'+app+'.eldermark.com/api/graphql/'+graphQL+'/graphql',
            SUBSCRIPTION:'wss://'+app+'.eldermark.com/api/graphql/'+graphQL+'/subscriptions'
        },
    TEST_FLIGHT:
        {
            WAKANDA:'https://'+app+'.eldermark.com/api',
            UI:'https://'+app+'.eldermark.com',
            GRAPHQL:'https://'+app+'.eldermark.com/api/graphql/'+graphQL+'/graphql',
            SUBSCRIPTION:'wss://'+app+'.eldermark.com/api/graphql/'+graphQL+'/subscriptions'
        },
    BACK_OFFICE:
        {
            WAKANDA:'http://111.93.249.50:8081',
            UI:'http://111.93.249.50:3000/company',
            GRAPHQL:'http://111.93.249.50:3010/graphql',
            SUBSCRIPTION:'ws://111.93.249.50:3010/subscriptions'
        },
    MY_LOCAL:
        {
            WAKANDA:'http://192.168.1.146:8081',
            UI:'http://192.168.1.146:3000/company',
            GRAPHQL:'http://192.168.1.146:3010/graphql',
            SUBSCRIPTION:'ws://192.168.1.146:3010/subscriptions'
        },
    DUSTIN_LOCAL:
        {
            WAKANDA:'http://192.168.0.46:8081',
            UI:'http://192.168.0.46/company',
            GRAPHQL:'http://192.168.0.46:3010/graphql',
            SUBSCRIPTION:'ws://192.168.0.46:3010/subscriptions'
        }
}


export class RemoteUrl {
    /**
     *
     * @param company
     * @param appDomain
     * @returns {string}
     */
    static getWakandaUrl(company = defaultCompany, appDomain = defaultAppDomain){
        company = company != null ? company.toLowerCase() : defaultCompany;
        let wakandaurl = ENV[_ENV_].WAKANDA;
        return wakandaurl.replace(app, appDomain);
    }

    /**
     *
     * @param company
     * @param appDomain
     * @returns {string}
     */
    static getUIUrl(company = defaultCompany, appDomain = defaultAppDomain){
        company = company != null ? company.toLowerCase() : defaultCompany;
        let uiurl = ENV[_ENV_].UI;
        return uiurl.replace(app, appDomain);
    }

    /**
     *
     * @param company
     * @param appDomain
     * @returns {string}
     */
    static getGraphQLUrl(company = defaultCompany, appDomain = defaultAppDomain){
        company = company != null ? company.toLowerCase() : defaultCompany;
        appDomain = appDomain != null ? appDomain : defaultAppDomain;
        /*
         this is hard code in case of demo7.
         */
        company = company == 'demo7' ? 'demo7crm':company
        let graphqlurl = ENV[_ENV_].GRAPHQL;
        return graphqlurl.replace(app, appDomain).replace(graphQL, company);
    }

    /**
     *
     * @param company
     * @param appDomain
     * @returns {string}
     */
    static getSubscriptionUrl(company = defaultCompany, appDomain = defaultAppDomain){
        company = company != null ? company.toLowerCase() : defaultCompany;
        appDomain = appDomain != null ? appDomain : defaultAppDomain;
        /*
         this is hard code in case of demo7.
         */
        company = company == 'demo7' ? 'demo7crm':company
        let subscriptionurl = ENV[_ENV_].SUBSCRIPTION;
        return subscriptionurl.replace(app, appDomain).replace(graphQL, company);
    }

    /**
     *
     * @returns {[string,string]}
     */
    static getSubDomain(){
        return SUB_DOMAIN;
    }

    static getLocalSettingIP(ip){
        if(ENV_DUSTIN)
            return 'http://'+ip+'/company';
        else
            return 'http://'+ip+':3000/company';
    }
}

