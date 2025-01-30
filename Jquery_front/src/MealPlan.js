const MealPlan = () => {
    $(document).ready(function () {
        // Fetch meal plans when the page loads
        $.ajax({
            url: '/mealplans/',  // URL to the meal plan API
            type: 'GET',
            success: function (response) {
                let mealPlanListHtml = '';
                $.each(response, function (index, mealplan) {
                    mealPlanListHtml += `
                        <div class="mealplan-item">
                            <span>${mealplan.name}</span>
                        </div>
                    `;
                });
                $('#mealplan-list').html(mealPlanListHtml);
            }
        });

        // Add new meal plan
        $(document).on('click', '#add-mealplan-btn', function () {
            const mealPlanName = $('#mealplan-name').val();
            if (mealPlanName) {
                $.ajax({
                    url: '/mealplans/',  // URL to the meal plan API for creation
                    type: 'POST',  // POST request to create a new meal plan
                    data: JSON.stringify({ name: mealPlanName }),  // Send data in JSON format
                    contentType: 'application/json',  // Set content type to JSON
                    success: function (response) {
                        // Append the new meal plan to the list
                        $('#mealplan-list').append(`
                            <div class="mealplan-item">
                                <span>${response.name}</span>
                            </div>
                        `);
                        $('#mealplan-name').val('');  // Clear input field
                    },
                    error: function () {
                        alert('Failed to add meal plan');
                    }
                });
            }
        });
    });
};

// Export the function
module.exports= MealPlan;
