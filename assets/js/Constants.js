/* Constants, variables and enums used throughout the application */
export const endpoints = {
    'recipes': '/api/recipes/',
    'wine': '/api/product_pairings/'
};

export const plan_types = {
    FAMILY: {
        value: 'family',
        label: 'Family',
        data_path: 'family_plan',
        active: false,
        items_per_row: 2
    },
    TWO_PERSON: {
        value: 'two_person',
        data_path: 'two_person_plan',
        label: 'Two Person',
        active: false,
        items_per_row: 3
    }
};