
let url = new URLSearchParams(window.location.search);
let mealID = url.get("id");


async function loadMealDetails() {
    try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
        let data = await res.json();

        let meal = data.meals[0];


        document.getElementById("mealName").innerText = meal.strMeal;
        document.getElementById("mealCategory").innerText += `${meal.strCategory} `;
        document.getElementById("mealArea").innerText += `${meal.strArea} `;
        document.getElementById("mealImg").src = meal.strMealThumb;
        document.getElementById("instructions").innerText = meal.strInstructions;

        let ingredientsList = "";
        for (let i = 1; i <= 20; i++) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];

            if (ingredient && ingredient.trim() !== "") {
                ingredientsList += `<li>${ingredient} - ${measure}</li>`;
            }
        }
        document.getElementById("ingredientsList").innerHTML = ingredientsList;
    } catch (err) {
        console.error("Error:", err);
    }
}

loadMealDetails();
