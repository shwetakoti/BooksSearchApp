const BOOKS_SEARCH_URL = 'https://www.googleapis.com/books/v1/volumes';

var startIndex_next = 0;
var startIndex_prev = 6;
var counter = 6;
var startIndex = 0;
var query ;
var searchTerm ;

//getBooksData send a GET request to book API based on a searchTerm
//The response is of type JSON and is handled by displayData()
function getBooksData(searchTerm)
{
  const settings = {
    url: BOOKS_SEARCH_URL,
    data: {
      q: `${searchTerm}`,
      maxResults: 6,
      startIndex: 0
    },
    dataType: 'json',
    type: 'GET',
    success: displayData
  };

  $.get(settings);
}

//data is display as a grid with a total of 6 results on each page
//each row has 3 results. Data that is returned by the API is split into rwos and columns
function displayData(data)
{
  $('.js-search-results-0').html('');
  $('.js-search-results-1').html('');
  $('.js-search-results-2').html('');

  $.each(data.items,function(i,item)
  {
     console.log(data);
     var column = Math.floor(i/2);
     var className = '.js-search-results-'+column;

     $(className).append(
      ` <div>
         <br>
         <a href="${item.volumeInfo.infoLink}" target="_blank"><img src="${item.volumeInfo.imageLinks.smallThumbnail} target="_blank" </img></a>
         <a href="${item.volumeInfo.infoLink}" target="_blank"><h5>${item.volumeInfo.title}</h5></a>
        </div>
      `)

   }) //.each

   //Each page will have a 'Next' button
   $('.js-next').html(`<br><br><button id="next" role="button" type="submit">Next</button>`)

   //Except first page, all other pages will have have a 'previous' button along with 'next' button
   if(startIndex > 0)
     {
       $('.js-prev').html(`<br><br><button id="prev" role="button" type="submit">Previous</button>`)
     }

  if(startIndex == 0)
  {
    $('.js-prev').html('');
  }
}//displayData

//Attaching an event to 'Next' and 'Previous' buttons
$('.js-next').on('click','#next',function(event)
{
  event.preventDefault();
  startIndex = startIndex+counter;
  nextResultSet(query);
})

$('.js-prev').on('click','#prev',function(event)
{
  event.preventDefault();
  startIndex = startIndex-counter;
  prevResultSet(query);
})


//Event handler when user clicks 'Next' button
function nextResultSet(searchTerm)
{
  console.log('I am in nextResultSet'+startIndex) ;
  const settings = {
    url: BOOKS_SEARCH_URL,
    data: {
      q: `${searchTerm}`,
      maxResults: 6,
      startIndex: startIndex
    },
    dataType: 'json',
    type: 'GET',
    success: displayData
  };
  $.get(settings);
}

//Event handler when user clicks 'Previous' button
function prevResultSet(searchTerm)
{
  const settings = {
    url: BOOKS_SEARCH_URL,
    data: {
      q: `${searchTerm}`,
      maxResults: 6,
      startIndex: startIndex
    },
    dataType: 'json',
    type: 'GET',
    success: displayData
  };
  $.get(settings);
}

//This function describes the event handler when user submits
// a search keyword. The search term is stored in a variable and is passed to a
// function that gets data from google books google books google books API
function bookSubmit()
{
   $('.js-search-form').submit(event => {
    event.preventDefault();
    queryTarget = $(event.currentTarget).find('.js-query');
    query = queryTarget.val();
    if(!query)
    {
      console.log("Enter a value");
      alert("Enter a value");
    }
    // clear the input
    queryTarget.val("");
    getBooksData(query);
  });
}

//callback function after the page loads
$(bookSubmit);
