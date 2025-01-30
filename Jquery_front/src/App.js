const $= require ('jquery');
const GroceryItems= require ('./GroceryItems.js');
const Ingredients= require ('./Ingredients.js');
const MealPlan= require ('./MealPlan.js');
const Recipes= require ('./Recipes.js');

$(document).ready(function () {
    // Initialize all components
    GroceryItems();
    Ingredients();
    MealPlan();
    Recipes();
});



// const GroceryItems= require("./src/assets/components/GroceryItems")
// const Ingredients= require("./src/assets/components/Ingredients")
// const MealPlan= require("./src/assets/components/MealPlan")
// const Recipes= require("./src/assets/components/Recipes")

// function App() {
//     return(
//         <>
//         <div className= "block">
//             <Ingredients />
//         </div>
//         <div className= "block">
//             <Recipes />
//         </div>
//         <div className= "block">
//             <GroceryItems />
//         </div>
//         <div className= "block">
//             <MealPlan />
//         </div>
//         </>
//     )
// }