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

$(document).ready(fetchFoods());
