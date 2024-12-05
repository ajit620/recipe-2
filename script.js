// DOM Elements
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search');
const resultsList = document.querySelector('#results');

// Form Submit Handler
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchRecipes();
});

// Fetch Recipes from API
async function searchRecipes() {
    const searchValue = searchInput.value.trim();

    if (!searchValue) {
        alert("Please enter some ingredients.");
        return;
    }

    try {
        const response = await fetch(
            `https://api.edamam.com/search?q=${searchValue}&app_id=7aa516a5&app_key=dc836a223fb788b11ae390504d9e97ce&from=0&to=10`
        );

        if (!response.ok) {
            throw new Error("Failed to fetch recipes.");
        }

        const data = await response.json();
        displayRecipes(data.hits);
    } catch (error) {
        console.error("Error fetching recipes:", error);
        resultsList.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    }
}

// Display Recipes in Results Section
function displayRecipes(recipes) {
    if (recipes.length === 0) {
        resultsList.innerHTML = "<p>No recipes found for your search.</p>";
        return;
    }

    let html = '';
    recipes.forEach((recipe) => {
        html += `
            <div>
                <img src="${recipe.recipe.image}" alt="${recipe.recipe.label}">
                <h3>${recipe.recipe.label}</h3>
                <ul>
                    ${recipe.recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
                <a href="${recipe.recipe.url}" target="_blank">View Recipe</a>
            </div>
        `;
    });

    resultsList.innerHTML = html;
}
