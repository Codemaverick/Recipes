/**
 * @author - Tolu Abayomi
 * May 2016
 */
import { endpoints, plan_types } from './Constants';

/* Class to manage retrieval of data from data source */
class DataService {
    loadRecipes(options) {
        let date_str = options.week.replace(/-/g, '_');
        let url = `${endpoints.recipes}${options.plan}/${date_str}`;
        console.log(url);
        $.getJSON(url, options.success);
    }
    
    loadWineInfo(options) {
        let url = `${endpoints.wine}${options.id}`;
        $.getJSON(url, options.success);
    }
    
}

export default DataService;
