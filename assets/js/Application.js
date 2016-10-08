/**
 * @author - Tolu Abayomi
 * May 2016
 */

import DataService from './DataService';
import ViewManager from './ViewManager';
import TwoPersonView from './TwoPersonView';
import FamilyView from './FamilyView';
import StateManager from './StateManager';
import { endpoints, plan_types } from './Constants';

/* Array of option objects to initialize the select navigation list */
const weeks = [
    {label: '2016-03-21', value: '2016_03_21', disabled: false, selected: false},
    {label: '2016-03-28', value: '2016_03_28', disabled: false, selected: false}
];

/* Application Class  - Main driver class for the application */
class Application {
    constructor(options) {
        const { week, plan} = options; 
        this.view_manager = new ViewManager({
            views: {
                'two_person': new TwoPersonView(),
                'family': new FamilyView()
            },
            view_container: document.querySelector('.recipe-group')
        });
        
        this.initApplicationState(options);
        this.data_service = new DataService();
        this.renderViewElements();
        
        this.data_service.loadRecipes({
            plan: this.current_state.plan.value,
            week: this.current_state.week,
            success: this.handleRecipeDataReady.bind(this)
        });
        
        $(this.view_manager.view_container).on('click', '.btn', this.handleWineSelect.bind(this));
    }
    /**
     * Load application state. Check if location is a bookmarked state
     * @param {object} options - user defined options to default to on application start
     */
    initApplicationState(options) {
        let state = { 'plan': null, 'week': null, preserve_state: true}; 
        let location_state;
        
        StateManager.initialize(this.handlePopStateChange.bind(this));
        location_state = StateManager.getLocationState();

        if (location_state) {
            this.current_state = location_state;
        }
        else {
            this.current_state = Object.assign({}, state, options);
        }
       
    }
    
    renderViewElements() {
        this.compileViews();
        this.nav_container = document.querySelector('.nav-content');
        this.nav_el = document.querySelector('.nav');
        this.renderNavList(this.current_state.plan.value);
        $(this.nav_container).on('click', 'a', this.handleNavClick.bind(this)); 
        
        this.renderSelectList();    
    }
    
    /**
     * Change in application state by one of two elements - the dropdown list and nav links triggers data load
     * @param {object} new_state - new state of application
     */
    setState(new_state) {
        let updated = Object.assign({}, this.current_state, new_state);
        this.current_state = updated;
        let options = {
            plan: this.current_state.plan.value,
            week: this.current_state.week,
            success: this.handleRecipeDataReady.bind(this)
        }
        this.data_service.loadRecipes(options);
    }
    
    /**
     * pre-compile views on application load to speed up render
     */
    compileViews() {        
        let nav_html = $('#nav-template').html();
        this.nav_html = Handlebars.compile(nav_html);
        
        let modal_html = $('#wine-template').html();
        this.modal_html = Handlebars.compile(modal_html);
    }
    
    /**
     * Render navigation links preset with current application state
     * @parm {string} active - Currently active plan_id
     */
    renderNavList(active = null) {
        let nav_plans = [];
        let keys = Object.keys(plan_types);
        
        keys.forEach((type) => {
            nav_plans.push(plan_types[type])
            if (plan_types[type].value == active) {
                plan_types[type].active = true;
            }
            else {
                plan_types[type].active = false;
            }
        });
        
        let nav_menu = this.nav_html({
            plans: nav_plans
        });
        
        this.nav_container.innerHTML = nav_menu;
    }
    
    /**
     * Render dropdown list preset with current application state
     */
    renderSelectList() {
        let container = document.querySelector('.recipe-week-select');
        let default_option = {label: 'Choose a week', value: '', disabled: true, selected: false};
        
        if (this.current_state.week) {
            weeks.forEach((week) => {
               if (week.value === this.current_state.week)  {
                   week.selected = true;
               } 
            });
        }
        else {
            default_option.selected = true;
        }
        
        let options = [
            default_option,
            ...weeks
        ];
        
        let selectList = document.createElement('select');
        selectList.setAttribute('class', 'form-control');
        
        options.forEach((option) => {
            let opt = document.createElement('option');
            opt.setAttribute('value', option.value);
            opt.textContent = option.label;
            
            if (option.disabled) {
                opt.setAttribute('disabled','disabled');
            } 
           
            if (option.selected) {
                opt.setAttribute('selected', 'selected');
            }
            
            selectList.appendChild(opt);
        });
        
        $(container).empty();
        container.appendChild(selectList);
        selectList.addEventListener('change', this.handleWeekChange.bind(this));
    }
    
    /**  Event Handlers  */
    
    handleRecipeDataReady(data){
        let location_hash;
        let current_view = this.current_state.plan.value;
        this.view_manager.views[current_view].setViewData(data);
        
        if (this.current_state.preserve_state) { //true if triggered by nav or dropdown
            this.current_state.preserve_state = false;
            location_hash = `#/${this.current_state.plan.value}/${this.current_state.week}/`;
            window.history.pushState(this.current_state, '', location_hash);
        }
        
        if (this.current_state.popstate) {
            this.renderNavList(this.current_state.plan.value);
            this.renderSelectList();
            this.current_state.popstate = false;
        }
        
        this.view_manager.setActiveView(this.current_state.plan.value);
        
        let week_label = this.current_state.week.replace(/_/g, '-');
        let title = `${this.current_state.plan.label} Plan for Week of ${week_label}`;
        this.view_manager.setHeaderText(title);
    }
    
    
    handleWeekChange(e) {
        console.log('Option selected');
        let ind= e.target.selectedIndex - 1;
        this.setState({week: weeks[ind].value, preserve_state: true});
    }
    
    handleNavClick(e) {
        let nav_path = e.target.dataset.navPath
        console.log(nav_path);
        this.renderNavList(nav_path);
        let keys = Object.keys(plan_types);
        let selected = null;

        keys.forEach((item) => {
            if (plan_types[item].value === nav_path) {
                selected = plan_types[item]; 
            }
        });

        this.setState({plan: selected, preserve_state: true});
       return false;
    }
    
    handleWineSelect(e){
       console.log('Wine button clicked');
       this.data_service.loadWineInfo({
           id: e.target.dataset.wineId, 
           success: this.handleWineResponse.bind(this)
        });
    }
    
    handleWineResponse(response) {
        let product = response.product_pairings[0].paired_product.producible.wine;
        let view_data = {
            name: product.name,
            varietals_name: product.varietals[0].name,
            year: product.year,
            image_url: product.bottle_image_url,
            image_alt_text: product.name,
            description: product.description,
            fun_fact: product.fun_facts
        };
        let content = this.modal_html(view_data);
        let modal_el = document.createElement('div');
        modal_el.setAttribute('class', 'modal');
        
        let modal_hidden = document.querySelector('#modal-window');
        modal_hidden.innerHTML = content;
        $(modal_hidden).modal().on('hidden.bs.modal', (e) => {
            $(modal_hidden).empty();  
        });
        
    }
    
    handlePopStateChange(data) {
        if (data.state) {
            data.state.popstate = true;
            this.setState(data.state);
        }
    }
    
    
}

export default Application;