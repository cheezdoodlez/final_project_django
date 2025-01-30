const Recipes = () => {
    $(document).ready(function () {
        // Search recipes by ingredients
        $('#search-recipes-btn').click(function () {
            const ingredients = $('#ingredients').val();
            const number = $('#number').val();
            if (ingredients) {
                $.ajax({
                    url: '/recipes/',  // URL for RecipeListView API
                    type: 'GET',
                    data: { ingredients: ingredients, number: number },
                    success: function (response) {
                        let recipeListHtml = '';
                        $.each(response, function (index, recipe) {
                            recipeListHtml += `
                                <div class="recipe-item" data-id="${recipe.id}">
                                    <h3>${recipe.title}</h3>
                                    <button class="view-recipe-btn">View Recipe</button>
                                </div>
                            `;
                        });
                        $('#recipe-list').html(recipeListHtml);
                    },
                    error: function () {
                        alert('Error fetching recipes');
                    }
                });
            } else {
                alert('Please enter ingredients');
            }
        });

        // Fetch detailed recipe information
        $(document).on('click', '.view-recipe-btn', function () {
            const recipeId = $(this).closest('.recipe-item').data('id');
            $.ajax({
                url: `/${recipeId}/`,  // URL for ExternalRecipeDetailView API
                type: 'GET',
                success: function (response) {
                    let recipeDetailsHtml = `
                        <h2>${response.title}</h2>
                        <p>${response.description}</p>
                        <p>Ingredients: ${response.ingredients.join(', ')}</p>
                        <p>Instructions: ${response.instructions}</p>
                    `;
                    $('#recipe-details').html(recipeDetailsHtml);
                },
                error: function () {
                    alert('Error fetching recipe details');
                }
            });
        });

        // Search recipes by query (name)
        $('#search-query-btn').click(function () {
            const query = $('#search-query').val();
            if (query) {
                $.ajax({
                    url: '/search/',  // URL for ExternalRecipeSearchView API
                    type: 'GET',
                    data: { query: query },
                    success: function (response) {
                        let searchResultsHtml = '';
                        $.each(response, function (index, recipe) {
                            searchResultsHtml += `
                                <div class="recipe-item" data-id="${recipe.id}">
                                    <h3>${recipe.title}</h3>
                                    <button class="view-recipe-btn">View Recipe</button>
                                </div>
                            `;
                        });
                        $('#recipe-list').html(searchResultsHtml);
                    },
                    error: function () {
                        alert('Error searching for recipes');
                    }
                });
            } else {
                alert('Please enter a search query');
            }
        });

        // Generate recipe from ingredients
        $('#generate-recipe-btn').click(function () {
            const ingredients = $('#generate-ingredients').val();
            if (ingredients) {
                $.ajax({
                    url: '/generate-recipe/',  // URL for GenerateRecipeView API
                    type: 'POST',
                    data: JSON.stringify({ ingredients: ingredients }),
                    contentType: 'application/json',
                    success: function (response) {
                        let generatedRecipeHtml = `
                            <h2>${response.title}</h2>
                            <p>${response.description}</p>
                            <p>Ingredients: ${response.ingredients.join(', ')}</p>
                            <p>Instructions: ${response.instructions}</p>
                        `;
                        $('#recipe-details').html(generatedRecipeHtml);
                    },
                    error: function () {
                        alert('Error generating recipe');
                    }
                });
            } else {
                alert('Please enter ingredients');
            }
        });
    });
};

// Export the function
module.exports= Recipes;
