/**
 * @author - Tolu Abayomi
 * May 2016
 */


 /* Manage application views, updates page title etc. */

class ViewManager {
    constructor(options) {
        this.views = options.views;
        this.activeView = null;
        this.view_container = options.view_container; 
        this.header_el = document.querySelector('.page-title');
    }
    
    setActiveView(id) {
        let $container = $(this.view_container);
        $container.empty();
        $container.html(this.views[id].render());
    }
    
    setHeaderText(text) {
        this.header_el.textContent = text;
    }
}

export default ViewManager;