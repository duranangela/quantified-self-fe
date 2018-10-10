let calories = []

const getMeals = () => {
  fetch('https://safe-meadow-38058.herokuapp.com/api/v1/meals')
    .then(response => response.json())
    .then(meals => listMeals(meals))
    .then(calories => totalCalories())
    .catch(error => console.error({ error}));
};

const listMeals = (meals) => {
  calories = [];
  meals.forEach(meal => {
    appendMeal(meal);
    listFoods(meal.foods, meal)});
  totalRemaining();
};

const appendMeal = (meal) => {
  $('.meals-list').append(`
      <tr>
        <th class="meal">${meal['name']}</th>
      </tr>
      <tr>
        <td><div id="${meal.id}-food-name"></div></td>
        <td><div id="${meal.id}-food-calories"></div></td>
      </tr>
      <tr>
        <td><a href="foods.html"><button class="default-button">Add Food</button></a></td>
      </tr>
  `);
};

const listFoods = (foods, meal) => {
  foods.forEach(food => {
    appendFood(food, meal);
  });
};

const appendFood = (food, meal) => {
  $(`#${meal.id}-food-name`).append(`
    <tr><td>${food.name}</td></tr>`);
  $(`#${meal.id}-food-calories`).append(`
    <tr><td>${food.calories}</td></tr>`);
  calories.push(food.calories);
};

const totalCalories = () => {
  let total = calories.reduce((a, b) => a + b, 0)
  $('#total').append(`${total}`);
};

const totalRemaining = () => {
  let total = calories.reduce((a, b) => a + b, 0)
  $('#remaining').append(`${$('#calorie-goal').val() - total}`)
}

getMeals()
