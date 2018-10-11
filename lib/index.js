let calories = []

const getMeals = () => {
  $(".foods").empty();
  fetch('https://safe-meadow-38058.herokuapp.com/api/v1/meals')
    .then(response => response.json())
    .then(meals => matchMeal(meals))
    .then(calories => totalCalories())
    .catch(error => console.error({ error}));
};

const matchMeal = (meals) => {
  calories = [];
  meals.forEach(meal => {
    if (meal.foods) {
    listFoods(meal.foods, meal)}
  });
  totalRemaining();
}

const listFoods = (foods, meal) => {
  foods.forEach(food => {
    appendFood(food, meal);
  });
};

const appendFood = (food, meal) => {
  $(`#${meal.name}`).append(`
    <tr id="meals/${meal.id}/foods/${food.id}">
      <td>${food.name}</td>
      <td>${food.calories}</td>
      <td><button class="remove">Remove</button></td>
    </tr>`);
  calories.push(food.calories);
};

const totalCalories = () => {
  $('#total').empty();
  let total = calories.reduce((a, b) => a + b, 0)
  $('#total').append(`${total}`);
};

const totalRemaining = () => {
  let total = calories.reduce((a, b) => a + b, 0)
  $('#remaining').html("")
  $('#remaining').append(`${$('#calorie-goal').val() - total}`)
}

getMeals()

$('.meal').on('click', '.remove', function() {
  var info = ($(this).closest('tr').attr("id"));
  fetch(`https://safe-meadow-38058.herokuapp.com/api/v1/${info}`, {
    method: "DELETE"
  })
  .then(() => getMeals());
})