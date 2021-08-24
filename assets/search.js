$(function () {
  // Current Ajax request.
  let currentAjaxRequest = null
  // Grabbing all search forms on the page, and adding a .search-results list to each.
  const searchForms = $('form[action="/search"]')
    .css('position', 'relative')
    .each(function () {
      // Grabbing text input.
      const input = $(this).find('input[name="q"]')
      // Adding a list for showing search results.
      const offSet = input.position().top + input.innerHeight()
      $(
        '<ul class="search-results flex flex-col bg-white rounded-md"></ul>'
      )
        .css({ position: 'absolute', left: '0px', top: offSet })
        .appendTo($(this))
        .hide()
      // Listening to keyup and change on the text field within these search forms.
      input.addClass(
        'block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
      )
      input.attr('autocomplete', 'off').bind('keyup change', function () {
        // What's the search term?
        const term = $(this).val()
        // What's the search form?
        const form = $(this).closest('form')
        // What's the search URL?
        const searchURL = '/search?type=product&q=' + term
        // What's the search results list?
        const resultsList = form.find('.search-results')
        // If that's a new term and it contains at least 3 characters.
        if (term.length > 3 && term != $(this).attr('data-old-term')) {
          // Saving old query.
          $(this).attr('data-old-term', term)
          // Killing any Ajax request that's currently being processed.
          if (currentAjaxRequest != null) currentAjaxRequest.abort()
          // Pulling results.
          currentAjaxRequest = $.getJSON(
            searchURL + '&view=json',
            function (data) {
              // Reset results.
              resultsList.empty()
              // If we have no results.
              if (data.results_count == 0) {
                // resultsList.html('<li><span class="title">No results.</span></li>');
                // resultsList.fadeIn(200);
                resultsList.hide()
              } else {
                // If we have results.
                $.each(data.results.slice(0, 5), function (index, item) {
                  const link = $(
                    '<a class="flex flex-row py-2 space-x-3 items-center"></a>'
                  ).attr('href', item.url)
                  link.append(
                    '<div class="thumbnail"><img src="' +
                      item.thumbnail +
                      '" /></div>'
                  )
                  link.append('<div class="title">' + item.title + '</div>')
                  link.wrap(
                    '<li class="py-3 hover:bg-gray-100 border-b border-solid border-gray-100 px-2"></li>'
                  )
                  resultsList.append(link.parent())
                })
                // The Ajax request will return at the most 10 results.
                // If there are more than 10, let's link to the search results page.
                if (data.results_count > 5) {
                  resultsList.append(
                    '<li class="p-3"><span class="title flex-grow text-center"><a href="' +
                      searchURL +
                      '">See all results (' +
                      data.results_count +
                      ')</a></span></li>'
                  )
                }
                resultsList.fadeIn(200)
              }
            }
          )
        }
      })
    })
  // Clicking outside makes the results disappear.
  $('body').bind('click', function () {
    $('.search-results').hide()
  })
})
