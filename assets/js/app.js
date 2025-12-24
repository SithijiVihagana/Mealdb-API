document.addEventListener("DOMContentLoaded", function () {

    // meal search function
    let input = document.getElementById("txt_mealsearch");
    let heading = document.getElementById("meal_result_header");
    let btn_search = document.getElementById("btn_search");

    if (input) {
        input.addEventListener("keypress", e => {
            if (e.key === "Enter") {
                e.preventDefault();
                apiCall(input.value.trim());
            }
        });
    }

    if (btn_search) {
        btn_search.addEventListener("click", e => {
            e.preventDefault();
            apiCall(input.value.trim());
        });
    }

    async function apiCall(meal_name) {
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal_name}`);
            let data = await res.json();

            if (data.meals === null) {
                heading.innerText = "No results found!!";
            } else {
                heading.innerText = "Search Result for " + meal_name;
                displayMeals(data.meals);
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }

    function displayMeals(meals) {
        let container = document.getElementById("searchResults");
        container.innerHTML = "";

        meals.forEach(meal => {

            let result = `
        <div class="col-md-3 mb-4">
            <div class="card h-100 shadow-sm meal-card" onclick="openMeal(${meal.idMeal})">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                <div class="card-body">
                    <h5 class="card-title d-flex justify-content-center">${meal.strMeal}</h5>
                </div>
            </div>
        </div>
        `;

            container.innerHTML += result;
        });
    }

    // Area_based search
    let AreaDropdown = document.getElementById("area_dropdown");

    if (AreaDropdown) {
        Areaload();
        AreaDropdown.addEventListener("change", () => {
            let selected = AreaDropdown.value;
            if (selected !== "") {
                AreaSearch(selected);
            }
        });
    }

    async function Areaload() {
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
            let data = await res.json();
            AreaDropdown.innerHTML = `<option value="">Select Area</option>`;

            data.meals.forEach(item => {
                AreaDropdown.innerHTML += `
                <option value="${item.strArea}">${item.strArea}</option>
            `;
            });

        } catch (error) {
            console.log("Area Load Error:", error);
        }

    }


    let Area_heading = document.getElementById("Area_header");

    let btn_Area = document.getElementById("btn_Area");

    if (btn_Area) {
        btn_Area.addEventListener("click", e => {
            AreaSearch(AreaDropdown.value);
        });
    }


    async function AreaSearch(area_name) {
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area_name}`);
            let data = await res.json();

            if (data.meals === null) {
                Area_heading.innerText = "No results found!!";
            } else {
                Area_heading.innerText = "Search Result for " + area_name;

                let container = document.getElementById("Results_Area");
                container.innerHTML = "";

                data.meals.forEach(meal => {
                    container.innerHTML += `
                    <div class="col-md-3 mb-4">
                        <div class="card h-100 shadow-sm meal-card" onclick="openMeal(${meal.idMeal})">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body">
                                <h5 class="card-title d-flex justify-content-center">${meal.strMeal}</h5>
                            </div>
                        </div>
                    </div>`;
                });
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }
    //Ingredient Search
    let Ingredient_heading = document.getElementById("Ingredient_header");
    let btn_Ingredient = document.getElementById("btn_Ingredient");
    let IngredientDropdown = document.getElementById("ingredient_dropdown");

    if (IngredientDropdown) {
        Ingredientload();
        IngredientDropdown.addEventListener("change", () => {
            let selected = IngredientDropdown.value;
            if (selected !== "") {
                IngredientSearch(selected);
            }
        });
    }

    async function Ingredientload() {
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
            let data = await res.json();
            IngredientDropdown.innerHTML = `<option value="">Select Ingredient</option>`;

            data.meals.forEach(item => {
                IngredientDropdown.innerHTML += `
                <option value="${item.strIngredient}">${item.strIngredient}</option>
            `;
            });

        } catch (error) {
            console.log("Ingredient Load Error:", error);
        }

    }

    if (btn_Ingredient) {
        btn_Ingredient.addEventListener("click", e => {
            IngredientSearch(IngredientDropdown.value);
        });
    }


    async function IngredientSearch(ingredient_name) {
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient_name}`);
            let data = await res.json();

            if (data.meals === null) {
                Ingredient_heading.innerText = "No results found!!";
            } else {
                Ingredient_heading.innerText = "Search Result for " + ingredient_name;

                let container = document.getElementById("Results_Ingredient");
                container.innerHTML = "";

                data.meals.forEach(meal => {
                    container.innerHTML += `
                    <div class="col-md-3 mb-4">
                        <div class="card h-100 shadow-sm meal-card" onclick="openMeal(${meal.idMeal})">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body">
                                <h5 class="card-title d-flex justify-content-center">${meal.strMeal}</h5>
                            </div>
                        </div>
                    </div>`;
                });
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }

    //category_based search
    let categoryDropdown = document.getElementById("category_dropdown");
    if (categoryDropdown) {
        loadCategories();

        categoryDropdown.addEventListener("change", () => {
            let selected = categoryDropdown.value;
            if (selected !== "") {
                categorySearch(selected);
            }
        });
    }

    async function loadCategories() {
        try {
            let res = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list");
            let data = await res.json();

            categoryDropdown.innerHTML = `<option value="">Select Category</option>`;

            data.meals.forEach(item => {
                categoryDropdown.innerHTML += `
                <option value="${item.strCategory}">${item.strCategory}</option>
            `;
            });

        } catch (error) {
            console.log("Category Load Error:", error);
        }
    }

    let category_heading = document.getElementById("category_header");
    let btn_category = document.getElementById("btn_category");

    if (btn_category) {
        btn_category.addEventListener("click", e => {
            categorySearch(categoryDropdown.value);
        });
    }


    async function categorySearch(category_name) {
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category_name}`);
            let content = await res.json();

            if (content.meals === null) {
                category_heading.innerText = "No results found!!";
            } else {
                category_heading.innerText = "Search Result for " + category_name;

                let container = document.getElementById("Results_category");
                container.innerHTML = "";

                content.meals.forEach(meal => {
                    container.innerHTML += `
                    <div class="col-md-3 mb-4">
                        <div class="card h-100 shadow-sm meal-card" onclick="openMeal(${meal.idMeal})">
                            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                            <div class="card-body">
                                <h5 class="card-title d-flex justify-content-center">${meal.strMeal}</h5>
                            </div>
                        </div>
                    </div>`;
                });
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }

});


function openMeal(id) {
    window.location.href = `meal.html?id=${id}`;
}

// random meal
async function random() {
    try {
        let res = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
        let data = await res.json();
        let meal = data.meals[0];

        let ingredients = "";
        for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
                ingredients += `<li>${ingredient} - ${measure}</li>`;
            }
        }

        let container = document.getElementById("Results");
        container.innerHTML = "";
        let card = `
            <div class="col-md-6 mb-4 mx-auto">

                <div class="card h-100 shadow-sm" onclick="openMeal(${meal.idMeal})">
                    <div class="text-center m-4">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}"class="img-fluid rounded meal_image">
                </div>

                    <div class="card-body">
                        <h5 class="card-title d-flex justify-content-center">${meal.strMeal}</h5>
                        <p class="card-text">Category :  ${meal.strCategory}</p>
                        <p class="card-text">Area :  ${meal.strArea}</p>
                        <p class="card-text">Ingredients & Measurements :</p>
                        <ul>
                           ${ingredients}
                       </ul>
                        <p class="card-text">Instructions :  ${meal.strInstructions}</p>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = card;

    } catch (error) {
        console.error("Fetch Error:", error);
    }
}