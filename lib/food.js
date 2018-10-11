const submitFoodButton = $('#submit-food-button');
const newFoodName = $('#food-name');
const newFoodCalories = $('#food-calories');
const foodTable = $('.food-table')
const addFoodBar = $('.add-food-bar')
let mealId = (window.location.search.substr(1))

const fetchFoods = () => {
  fetch('https://safe-meadow-38058.herokuapp.com/api/v1/foods')
  .then(response => response.json())
  .then(foods => appendFoods(foods))
  .catch(error => console.log({error}));
};

const fetchMeal = (id) => {
  mealId = parseInt(id)
  fetch(`https://safe-meadow-38058.herokuapp.com/api/v1/meals/${mealId}/foods`)
  .then(response => responseCondition(response))
}

const responseCondition = (response) => {
  if (response.status == 200) {
    (response.json())
    .then(data => addFoodBar.append(
      `<button type="button" class="add-checked-food-button">Add Checked Food To ${data.name}</button>`
    ))
  }
}

const appendFoods = (foods) => {
  foods.forEach(food => {
    appendFood(food);
  });
};

const appendFood = (food) => {
  $('.food-table').append(`
  <tr class="table-row-${food.id}">
    <td><input type="checkbox" id="check-box-${food.id}">${food.name}</td>
    <td>${food.calories}</td>
    <td><button type="button" id="${food.id}">remove</button></td>
  </tr>`);
  $(`#${food.id}`).click(deleteFood)
};

const newFood = (event) => {
  let foodName = newFoodName.val();
  let foodCals = newFoodCalories.val();
  event.preventDefault()

  fetch('https://safe-meadow-38058.herokuapp.com/api/v1/foods',{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "food": { "name": `${foodName}`, "calories": `${foodCals}`} })
  }).then(response => response.json())
  .then(() => foodTable.empty())
  .then(() => fetchFoods())
  newFoodName.val('');
  newFoodCalories.val('');
}

const deleteFood = (event) => {
  event.preventDefault()
  let id = event.target.id
  fetch(`https://safe-meadow-38058.herokuapp.com/api/v1/foods/${id}`,{
    method: 'delete'
  }).then(() => foodTable.empty())
  .then(() => fetchFoods())
}

$(document).ready(fetchFoods());
$(document).ready(fetchMeal(mealId));
submitFoodButton.click(newFood);
