const submitFoodButton = $('#submit-food-button');
const newFoodName = $('#food-name');
const newFoodCalories = $('#food-calories');

const fetchFoods = () => {
  fetch('https://fast-meadow-36413.herokuapp.com/api/v1/foods')
  .then(response => response.json())
  .then(foods => appendFoods(foods))
  .catch(error => console.log({error}));
};

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
    <td><button type="button" id="remove-food-button">remove</button></td>
  </tr>`);
};

const newFood = () => {
  let foodName = newFoodName.val();
  let foodCals = newFoodCalories.val();
  fetch('https://fast-meadow-36413.herokuapp.com/api/v1/foods',{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "food": { "name": `${foodName}`, "calories": `${foodCals}`} })
  }).then(response => response.json())
  .then(data => console.log(data));

  fetchFoods();
}

$(document).ready(fetchFoods());
submitFoodButton.click(newFood);
