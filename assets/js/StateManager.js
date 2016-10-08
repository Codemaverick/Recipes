/**
 * @author - Tolu Abayomi
 * May 2016
 */
import { plan_types } from './Constants';

/*  Class to manage application state. 
    Loads application state on page load from url if exists and handles popstate event 
*/
class StateManager{
    static initialize(handler) {
        window.addEventListener('popstate', handler);
    }
    
    /**
     * Parse application state from url
     */
    static getLocationState() {
        let url_plan, url_week;
        //check if user coming from a bookmarked link
        let hash = window.location.hash;
        if (hash === '') {
            return null;
        }
       
        let tokens = hash.split('/');
        let plan_value = tokens[1];
        let keys = Object.keys(plan_types);
        
        keys.forEach((item) => {
            if (plan_types[item].value == plan_value){
                url_plan = plan_types[item];
            }
        })

        url_week = tokens[2];
        return {'plan': url_plan, 'week': url_week};

    }
}

export default StateManager;