/**
 * @author - Tolu Abayomi
 * May 2016
 */
import { plan_types } from './Constants';

/* FamilyView view class renders markup customized for family view */
class FamilyView {
    constructor(){
        this.view_data = {};
        let recipe_html = $('#recipe-template').html();
        this.view_template = Handlebars.compile(recipe_html);
    }
    
    setViewData(data) {
        this.view_data = data;
    }
    
    render(){
        let recipes = this.view_data[plan_types.FAMILY.data_path].recipes;
        let rows = [];
        let items_per_row = plan_types.FAMILY.items_per_row;
        let row_count = Math.ceil(recipes.length/items_per_row);
        let row;
        let start_index, end_index;
        let last_index = recipes.length - 1;
        
        if (recipes.length <= 0) {
            return;
        }
        
        for(let a = 0; a < row_count; a++) {
            row = document.createElement('div');
            row.setAttribute('class', 'row'); 
            start_index = a * items_per_row;
            end_index = start_index + items_per_row;
            end_index = end_index > recipes.length ? recipes.length : end_index;
            let rendered = '';
            
            for(let b = start_index; b < end_index; b++) {
                let item = recipes[b];
                let view_data = {
                    image_url: item.recipe.high_menu_thumb_url,
                    image_alt_text: item.recipe.main_title,
                    title: item.recipe.main_title,
                    subtitle: item.recipe.sub_title,
                    vegetarian: item.recipe.vegetarian 
                };
                
                if (item.recipe.wine_pairing_id) {
                    view_data.wine_pairing_id = item.recipe.wine_pairing_id;
                }
                
                if (b == start_index) {
                    view_data.two_column = true;
                }
                
                rendered += this.view_template(view_data);
            }
            
             row.innerHTML = rendered;
             rows.push(row);
        }
        
        return rows;
    }
}

export default FamilyView;