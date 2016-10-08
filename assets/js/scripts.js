import Application from './Application';
import { plan_types } from './Constants';

$('domready', function(){
   new Application({
       week: '2016_03_21',
       plan: plan_types.TWO_PERSON
   }); 
});