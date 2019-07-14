//'use strict';

const searchURL = 'developer.nps.gov/api/v1/parks';
const apiKey = 'yw45NGkFZEicOJWZOJ6yxcMv4SgBV1BwVYYja0em';



function displayResults(responseJson){
	console.log(responseJson);
	$('#results-list').empty();

	for (let i=0; i<responseJson.length; i++){
		$('#results-list').append(
      	`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
      	<p>${responseJson.data[i].description}</p>
     	 </li>`
    )};

	console.log(responseJson.data[0].fullName);

  	$('#results').removeClass('hidden');
	}


function formatQueryParams(params){
	console.log(params);
	const queryItems = Object.keys(params)
	 .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  	return queryItems.join('&');
}

function watchForm(){
	$('form').submit(event=>{
		event.preventDefault();
		const searchState = $('#js-search-term').val();
		const maxResults = $('#js-max-results').val();
		console.log('clicked submit!');
	getNationalParks(searchState, maxResults);
	});
}

function getNationalParks(states, results){
	console.log(states);
	console.log(results);

	const params = {
    stateCode: states,
    limit: results,
    api_key: apiKey
  };

  const queryString = formatQueryParams(params);
  const url = `https://${searchURL}?${queryString}`

  console.log(url);

  fetch(url)
  	  .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

	//displayResults();



$(watchForm);