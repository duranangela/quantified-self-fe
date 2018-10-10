
const getMeals = () => {
  fetch('http://localhost:3000/api/v1/meals')
    .then(response => response.json())
    .then(meals => listMeals(meals))
    .catch(error => console.error({ error}));
};

const listMeals = (meals) => {
  meals.forEach(meal => {
    appendMeal(meal);
    listFoods(meal.foods, meal)

  });
};

const appendMeal = (meal) => {
  $('.meals-list').append(`
      <tr>
        <th class="meal">${meal['name']}</th>
      </tr>
      <tr>
        <td><div class="${meal.id}-food-name"></div></td>
        <td><div class="${meal.id}-food-calories"></div></td>
      </tr>
  `);
};

const listFoods = (foods, meal) => {
  foods.forEach(food => {
    appendFood(food, meal);
  });
};

const appendFood = (food, meal) => {
  $(`.${meal.id}-food-name`).append(`
    <tr><td>${food.name}</td></tr>`);
  $(`.${meal.id}-food-calories`).append(`
    <tr><td>${food.calories}</td></tr>`);
};

$(document).ready(getMeals);
