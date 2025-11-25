let input = document.getElementById("txt_mealsearch");
let heading = document.getElementById("meal_result_header");
let btn_search = document.getElementById("btn_search");
input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        e.preventDefault();  // prevents form reload
        let meal_name = input.value.trim();
        apiCall(meal_name);
    }
});

async function apiCall(meal_name) {

    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal_name}`);
        let data = await res.json();
        console.log(data);
        if (data.meals === null) {
            heading.innerText = "No results found!!";
        } else {
            heading.innerText = "Search Result for " + (meal_name);
            displayMeals(data.meals);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
    }

}

btn_search.addEventListener("click", e => {
    e.preventDefault();
    let meal_name = input.value.trim();
    apiCall(meal_name);
});

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

function openMeal(id) {
    window.location.href = `meal.html?id=${id}`;
}

async function random() {

    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        let data = await res.json();
        console.log(data);
        let container = document.getElementById("Results");
        container.innerHTML = "";
        const mealsArray = data.meals;
        mealsArray.forEach(meal => {

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

    } catch (error) {
        console.error("Fetch Error:", error);
    }

}
