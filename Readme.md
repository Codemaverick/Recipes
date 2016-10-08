# Overview

The specifications are for a single page javascript application that enables a user to load recipes from an API based on a meal plan and specific week. Primary focus was given to separation of concerns as well as injecting dependencies where needed. Based on those specs, the application architecture is as follows:

The application code was written in ES6 with babel.js and webpack used for the build step.

**Application.js** - The main application class. This class serves as the app controller, managing interactions between the view and the data as well as handling events triggered in the UI. I made the decision to have all event handling done at this layer as it keeps all decisions to update/fetch data in one location, and at the top level of the app. 

A typical event like the user changing the current week would be handled by having the Application class request the new data from the data service, and then pass that data when it arrives to view classes which then prepare/format the data and render the html.

**DataService.js** - The data class manages loading the data from the data source, in this case the API. As the data loading is abstracted from the main application class, the data could easily be loaded from another data source such as a database without having to change the main application.
Custom loading functions were created to load data based on params passed in.

**StateManager.js** - Manages the loading of application state from the url on initial app load as well as the popstate event. This class was created separately to allow maximum flexibility for handling app state. The application state could easily be serialized for instance if necessary from this class.

**ViewManager.js** - Contains the logic of actually showing the data that has been loaded, as well as other global elements like the page title. 

**FamilyView, TwoPersonView** - These two view classes were created to address the specific UI needs of the different views. Family plans for instance only have 2 items per row as opposed to 3 for Two Family. Initially, the logic of this was handled from one class, but to make it more modular as well as allow for future variations in views to be handled easily, they were refactored as separate classes.



