const Ingredients = () => {
    $(document).ready(function () {
        // Fetch ingredients when the page loads
        $.ajax({
            url: '/ingredients/',  // URL to the ingredient API
            type: 'GET',
            success: function (response) {
                let ingredientListHtml = '';
                $.each(response, function (index, ingredient) {
                    ingredientListHtml += `
                        <div class="ingredient-item">
                            <span>${ingredient.name}</span>
                        </div>
                    `;
                });
                $('#ingredient-list').html(ingredientListHtml);
            }
        });

        // Add new ingredient functionality
        $(document).on('click', '#add-ingredient-btn', function () {
            const ingredientName = $('#ingredient-name').val();
            if (ingredientName) {
                $.ajax({
                    url: '/ingredients/',  // URL to the ingredient API for creation
                    type: 'POST',
                    data: JSON.stringify({ name: ingredientName }),  // Send data in JSON format
                    contentType: 'application/json',  // Set content type to JSON
                    success: function (response) {
                        // Append the new ingredient to the list
                        $('#ingredient-list').append(`
                            <div class="ingredient-item">
                                <span>${response.name}</span>
                            </div>
                        `);
                        $('#ingredient-name').val('');  // Clear input field
                    },
                    error: function () {
                        alert('Failed to add ingredient');
                    }
                });
            }
        });
    });
};

// Export the function
module.exports= Ingredients;
