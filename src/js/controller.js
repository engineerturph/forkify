import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
// import icons from '../img/icons.svg'; // Parcel 1
import { MODAL_CLOSE_SEC } from './config';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }
//Isleri yapan yer
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//////Yarin bunlari projende uygula
////Project planning
///User stories
//As a (type of user),I want(an action) so that (i can find new ideas for meals)
//As a user  i want to search for recipes so that i cant find new recipes
//User storilerden featurelari olustur(birsuru olcak)
///Features
//Search for recipes=Search bar,display results,display recipe with all information
//Vesaire
///Flowchart
//Dosyasi var asagida
///Architecture
//Good architecture iyi ayarlanmali iyi degistirilebilmeli iyi yeni ozellik eklenebilmeli
//React felan ile architecture u onlara hallettirebilion
//Architecture parcalari:
//Business Logic:Code that does the actual thing/State:Stores all frontent data/HTTP Library:Responsible for ajax requestests/Application logic:The codes you dont see(for implementation)/Presentation logic:Codes you see
//Model View Controller Architecture
//MVC/Model:Data and business logic,http library/Controller:Application logic/Presentation logic:view(kullanicin etkilesime girdigi yer)
//udemy kursunda 290. videodaki dk 12 deki resim iyi aciklior

//sass ile daha ii yazilio ama kullanmak icin parcel lazim
//recipe yuklenirken loading spinner ekle
//ayni anda 1den fazla indirebilirsin
//npm i 1. 2. 3. 4. 5.
//sitenin sonunda #1214124124 diye olan kisma hash denior sitenin filelarinda olan bise degil(bir textin sifresi demek)
//

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner(); //await yazmadan bu calisiyor
    //Loading recipe
    await model.loadRecipe(id); // awaitlemezsen syncronous calistirior ondan/async function icerinde/async functionda await onu durduruor

    //Rendering recipe
    recipeView.render(model.state.recipe);
    //re-Rendering when the selected one is highlighted
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    // Get search query
    const query = searchView.getQuery();
    if (!query) {
      return;
    }

    // Load search results
    await model.loadSearchResults(query);
    //Render search resuls
    resultsView.render(model.getSearchResultsPage());
    //Render pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function (goToPage) {
  //Render search resuls
  resultsView.render(model.getSearchResultsPage(goToPage));
  //Render pagination
  paginationView.render(model.state.search);
};
const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  recipeView.update(model.state.recipe);
};
const controllAddBookmark = function () {
  // Add remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);

  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controlAddRecipe = async function (newRecipe) {
  //normal functionda da awaitlemezsen sikinti
  try {
    addRecipeView.renderSpinner();

    await model.uploadRecipe(newRecipe);

    //Render recipe
    recipeView.render(model.state.recipe);

    //  Render Success message
    addRecipeView.renderMessage();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    //Change ID in URL
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow;
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err);
  }
};
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerrender(controlRecipes);
  searchView.addSearchHandler(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controllAddBookmark);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
//addeventlisteneri viewe almak icin functionu baska addEventlistenera argument olarak veriosun
//Publisher subscriber pattern
