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
    appendAddButton(meal)
  });
  totalRemaining();
}

const appendAddButton = (meal) => {
  $(`#${meal.name}-add`).empty()
  $(`#${meal.name}-add`).append(`
    <a href="foods.html?${meal.id}"><button class="add">Add Food</button></a>
    `)
}

const listFoods = (foods, meal) => {
  foods.forEach(food => {
    appendFood(food, meal);
  });
};

const appendFood = (food, meal) => {
  $(`#${meal.name}`).append(`
      <div class='tr' id="meals/${meal.id}/foods/${food.id}">
        <div>${food.name}</div>
        <div>${food.calories}</div>
        <div><button class="remove">Remove</button></div>
      </div>`);
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

//remove food from meal buttons
$('.meal').on('click', '.remove', function() {
  var info = (this.closest('div.tr').id);
  fetch(`https://safe-meadow-38058.herokuapp.com/api/v1/${info}`, {
    method: "DELETE"
  })
  .then(() => getMeals());
})

getMeals()
