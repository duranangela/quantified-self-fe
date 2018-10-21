const submitFoodButton = $('#submit-food-button');
const newFoodName = $('#food-name');
const newFoodCalories = $('#food-calories');
const foodTable = $('.food-table');
const addFoodBar = $('#add-food-bar');

let foodId = 0;
let count = 0;
let name;
let mealId = (window.location.search.substr(1));
let api = 'http://api.yummly.com/v1/api/recipes?_app_id=9d5db2a9&_app_key=3d13bbe2176f011c61124320d312228d&q=';

const fetchFoods = () => {
  fetch('https://still-dusk-48291.herokuapp.com/api/v1/foods')
  .then(response => response.json())
  .then(foods => appendFoods(foods))
  .catch(error => console.log({error}));
};

const fetchMeal = (id) => {
  mealId = parseInt(id);
  fetch(`https://still-dusk-48291.herokuapp.com/api/v1/meals/${mealId}/foods`)
  .then(response => responseCondition(response))
};

const responseCondition = (response) => {
  if (response.status == 200) {
    (response.json())
    .then(data => addFoodBar.append(
      `<button type="button" id="add-selected-food-button">Add Selected Food To ${data.name}</button>`
    ))
    .then(() => {
      $("#add-food-bar").show()
    })
    .then(() => {
      $(".checkbox").show()
    });
  }
};

const appendFoods = (foods) => {
  foods.forEach(food => {
    appendFood(food);
  });
};

const appendFood = (food) => {
  let foodName = food.name
  foodName = foodName.replace(/\s/g, "-")
  foodTable.append(`
  <tr id="table-row-${food.id}">
    <td width="70%" class='edit' id="${food.id}-${food.name}" contenteditable='true'><input class="checkbox" type="radio" name="drone" value="${food.id}">${food.name}</td>
    <td width="10%" class='edit' id="${food.id}-${food.calories}"contenteditable='true'>${food.calories}</td>
    <td width="10%"><button type="button" class='remove' id="${food.id}-delete">remove</button></td>
    <td width="10%"><button type="button" class='get-recipe' id="${foodName}">find recipes</button></td>
  </tr>`);
  $(`#${food.id}-delete`).click(deleteFood);
  $(`#${foodName}`).click(getRecipe);
  $(".checkbox").hide();
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
  .then(food => appendFood(food))
  newFoodName.val('');
  newFoodCalories.val('');
};

const deleteFood = (event) => {
  event.preventDefault()
  let id = parseInt(event.target.id)
  fetch(`https://still-dusk-48291.herokuapp.com/api/v1/foods/${id}`,{
    method: 'delete'
  })
  .then(response => {
    if (response.status == 200) {
      let foodEl = $(`#table-row-${id}`)
      foodEl.remove()
    } else {
      window.alert("This food is included in some meals and\ can't be deleted unless you remove them from\ those meals first");
    }
  })
};

const addFood = () => {
  foodId = $( "input[name='drone']:checked" ).val();
  fetch(`https://still-dusk-48291.herokuapp.com/api/v1/meals/${mealId}/foods/${foodId}`,{
    method: 'post'
  }).then(window.location.href = 'index.html')
};

const getRecipe = (event) => {
  let food = event.target.id
  food = food.replace(/-/g, " ") + "+"
  api = api + food
  count += 1

  if (count == 1) {
    name = event.target.id
  } else {
    name = name + ' & ' + event.target.id
  }

  $(".recipes").empty();
  $(".recipes").append(`
    <h2>Recipes with ${name}</h2>`);
  fetch(api)
  .then(response => response.json())
  .then(recipes => iterateRecipes(recipes["matches"]))
  .catch(error => console.log({error}));
}

const iterateRecipes = (recipes) => {
  recipes.forEach(recipe => {
    appendRecipe(recipe)
  })
}

const appendRecipe = (recipe) => {
  $("#save-changes-btn").hide();
  $(".recipes").show().append(`
  <div>
    <p>${recipe["recipeName"]}</p>
    <img src=${recipe["smallImageUrls"][0]} >
  </div>
  `
  )
  $(".recipes").hide().fadeIn('fast');
}


submitFoodButton.click(newFood);

$(document).ready(fetchFoods());
$(document).ready(fetchMeal(mealId));

$(document).ready(function(){
  $("#food-search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".food-table tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});

foodId = $( "input[name='drone']:checked" ).val();

$(document).ready(function() {
  $('#add-food-bar').hide()
  $('#add-food-bar').on('click', '#add-selected-food-button', (addFood))
})

$(document).ready(function() {
  $('.food-table').on('click', '.edit', function() {
    $(".recipes").hide();
    food_id = parseInt($(this).prop('id'))
    name = $(this).closest('tr').find('td:first').text()
    calories = $(this).closest('tr').find('td:eq(1)').text()
    $('#save-changes-btn').empty();
    $('#save-changes-btn').show().append(
    `<button type="button" id="save-btn">Save Changes</button>`)
  })
  $("#save-changes-btn").on('click', '#save-btn', function(){
    fetch(`https://still-dusk-48291.herokuapp.com/api/v1/foods/${food_id}`, {
      method: 'patch',
      headers: { 'Content-Type': 'application/json' },
      body: { "food": { "name": `${name}`, "calories": `${calories}`} }
    })
    .then(() => {
      $("#save-changes-btn").hide()
    });
  })
  $('#save-changes-btn').hide();
})
