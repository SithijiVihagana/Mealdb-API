document.addEventListener("DOMContentLoaded", function () {

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
                    <h5 class="card-title">${meal.strMeal}</h5>
                </div>
            </div>
        </div>
        `;

            container.innerHTML += result;
        });
    }
    let Area_heading = document.getElementById("Area_header");
    let Area_input = document.getElementById("txt_Areasearch");
    let btn_Area = document.getElementById("btn_Area");

    if (Area_input) {
        Area_input.addEventListener("keypress", e => {
            if (e.key === "Enter") {
                AreaSearch(Area_input.value.trim());
            }
        });
    }

    if (btn_Area) {
        btn_Area.addEventListener("click", e => {
            AreaSearch(Area_input.value.trim());
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
                                <h5 class="card-title">${meal.strMeal}</h5>
                            </div>
                        </div>
                    </div>`;
                });
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }

    let Ingredient_heading = document.getElementById("Ingredient_header");
    let Ingredient_input = document.getElementById("txt_Ingredientsearch");
    let btn_Ingredient = document.getElementById("btn_Ingredient");

    if (Ingredient_input) {
        Ingredient_input.addEventListener("keypress", e => {
            if (e.key === "Enter") {
                IngredientSearch(Ingredient_input.value.trim());
            }
        });
    }

    if (btn_Ingredient) {
        btn_Ingredient.addEventListener("click", e => {
            IngredientSearch(Ingredient_input.value.trim());
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
                                <h5 class="card-title">${meal.strMeal}</h5>
                            </div>
                        </div>
                    </div>`;
                });
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }
    let left_list = document.getElementById("left_colum");
    let right_list = document.getElementById("right_colum");
    if (left_list && right_list) {
        categoryload();
    }

    async function categoryload() {
        try {
            let res = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`);
            let data = await res.json();
            if (data.meals !== null) {
                left_list.innerHTML = "";
                right_list.innerHTML = "";
                let middle = Math.ceil(data.meals.length / 2);
                let leftSide = data.meals.slice(0, middle);
                let rightSide = data.meals.slice(middle);

                leftSide.forEach(category => {
                    left_list.innerHTML += `<li>${category.strCategory}</li>`;
                });

                rightSide.forEach(category => {
                    right_list.innerHTML += `<li>${category.strCategory}</li>`;
                });
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }

    let category_heading = document.getElementById("category_header");
    let category_input = document.getElementById("txt_categorysearch");
    let btn_category = document.getElementById("btn_category");

    if (category_input) {
        category_input.addEventListener("keypress", e => {
            if (e.key === "Enter") {
                categorySearch(category_input.value.trim());
            }
        });
    }

    if (btn_category) {
        btn_category.addEventListener("click", e => {
            categorySearch(category_input.value.trim());
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
                                <h5 class="card-title">${meal.strMeal}</h5>
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
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
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