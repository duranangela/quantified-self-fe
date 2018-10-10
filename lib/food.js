const submitFoodButton = $('#submit-food-button');
const newFoodName = $('#food-name');
const newFoodCalories = $('#food-calories');
const foodTable = $('.food-table')

const fetchFoods = () => {
  fetch('https://safe-meadow-38058.herokuapp.com/api/v1/foods')
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
  .then(data => console.log(data));

  foodTable.empty();

  fetchFoods();
}

const deleteFood = (event) => {
  event.preventDefault()
  let id = event.target.id
  fetch(`https://safe-meadow-38058.herokuapp.com/api/v1/foods/${id}`,{
    method: 'delete'
  });

  foodTable.empty();

  fetchFoods();
}

$(document).ready(fetchFoods());
submitFoodButton.click(newFood);
