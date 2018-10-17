const submitFoodButton = $('#submit-food-button');

const newFoodName = $('#food-name');
const newFoodCalories = $('#food-calories');

const foodTable = $('.food-table');

const addFoodBar = $('.add-food-bar');

let foodId = 0
let mealId = (window.location.search.substr(1))

const fetchFoods = () => {
  fetch('https://still-dusk-48291.herokuapp.com/api/v1/foods')
  .then(response => response.json())
  .then(foods => appendFoods(foods))
  .catch(error => console.log({error}));
};

const fetchMeal = (id) => {
  mealId = parseInt(id)
  fetch(`https://still-dusk-48291.herokuapp.com/api/v1/meals/${mealId}/foods`)
  .then(response => responseCondition(response))
};

const responseCondition = (response) => {
  if (response.status == 200) {
    (response.json())
    .then(data => addFoodBar.append(
      `<button type="button" id="add-selected-food-button">Add Selected Food To ${data.name}</button>`
    ));
  }
};

const appendFoods = (foods) => {
  foods.forEach(food => {
    appendFood(food);
  });
};

const appendFood = (food) => {
  $('.food-table').append(`
  <tr class="table-row-${food.id}">
    <td width="75%" ><input class="radio-box" type="radio" name="drone" value="${food.id}">${food.name}</td>
    <td width="15%">${food.calories}</td>
    <td width="10%"><button type="button" class='remove' id="${food.id}">remove</button></td>
  </tr>`);
  $(`#${food.id}`).click(deleteFood)
};

const newFood = (event) => {
  let foodName = newFoodName.val();
  let foodCals = newFoodCalories.val();

  event.preventDefault()

  fetch('https://still-dusk-48291.herokuapp.com/api/v1/foods',{
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "food": { "name": `${foodName}`, "calories": `${foodCals}`} })
  }).then(response => response.json())
  .then(() => foodTable.empty())
  .then(() => fetchFoods())
  newFoodName.val('');
  newFoodCalories.val('');
};

const deleteFood = (event) => {
  event.preventDefault()
  let id = event.target.id
  fetch(`https://still-dusk-48291.herokuapp.com/api/v1/foods/${id}`,{
    method: 'delete'
  }).then(() => foodTable.empty())
  .then(() => fetchFoods())
};

const addFood = () => {
  foodId = $( "input[name='drone']:checked" ).val();
  fetch(`https://still-dusk-48291.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`,{
    method: 'post'
  }).then(window.location.href = 'index.html')
};

submitFoodButton.click(newFood);

$(document).ready(fetchFoods());

$(document).ready(fetchMeal(mealId));



foodId = $( "input[name='drone']:checked" ).val();


$('.add-food-bar').on('click', '#add-selected-food-button', (addFood))
