const GroceryItems = () => {
    $(document).ready(function () {
        // Fetch grocery items when the page loads
        $.ajax({
            url: '/grocery-items/',  // URL to the list API
            type: 'GET',
            success: function (response) {
                let groceryListHtml = '';
                $.each(response, function (index, item) {
                    groceryListHtml += `
                        <div class="grocery-item" data-id="${item.id}">
                            <span>${item.name}</span>
                            <button class="toggle-btn">${item.is_purchased ? 'Undo Purchase' : 'Mark as Purchased'}</button>
                        </div>
                    `;
                });
                $('#grocery-list').html(groceryListHtml);
            }
        });
    });

    $(document).on('click', '.toggle-btn', function () {
        const itemId = $(this).closest('.grocery-item').data('id');
        const button = $(this);

        $.ajax({
            url: `/grocery-items/${itemId}/toggle/`,  // URL to the toggle API
            type: 'PATCH',
            success: function (response) {
                // Update the button text based on the new status
                button.text(response.is_purchased ? 'Undo Purchase' : 'Mark as Purchased');
            }
        });
    });
};

// Export the function
module.exports= GroceryItems;
























// const GroceryItems = () => {
//     $(document).ready(function () {
//         // Fetch grocery items when the page loads
//         $.ajax({
//             url: '/grocery-items/',  // URL to the list API
//             type: 'GET',
//             success: function (response) {
//                 let groceryListHtml = '';
//                 $.each(response, function (index, item) {
//                     groceryListHtml += `
//                         <div class="grocery-item" data-id="${item.id}">
//                             <span>${item.name}</span>
//                             <button class="toggle-btn">${item.is_purchased ? 'Undo Purchase' : 'Mark as Purchased'}</button>
//                         </div>
//                     `;
//                 });
//                 $('#grocery-list').html(groceryListHtml);
//             }
//         });
//     });

//     $(document).on('click', '.toggle-btn', function () {
//         const itemId = $(this).closest('.grocery-item').data('id');

//         $.ajax({
//             url: `/grocery-items/${itemId}/toggle/`,  // URL to the toggle API
//             type: 'PATCH',  // HTTP method to update the resource
//             success: function (response) {
//                 // Update the button text based on the new status
//                 const button = $(this);
//                 button.text(response.is_purchased ? 'Undo Purchase' : 'Mark as Purchased');
//             }
//         });
//     });
//     return (
//         <body>

//             <h1>My Grocery List</h1>
//             <div id="grocery-list"></div>
//         </body>
//     )
// }

// module.exports= GroceryItems
