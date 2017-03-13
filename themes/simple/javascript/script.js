	jQuery.noConflict();

(function($) {
	$(document).ready(function() {
		/* removes text from search form on focus and replaces it on unfocus - if text is entered then it does not get replaced with default on unfocus */
		$('#SearchForm_SearchForm_action_results').val('L');
		var searchField = $('#SearchForm_SearchForm_Search');
		var default_value = searchField.val();
		searchField.focus(function() {
			$(this).addClass('active');
			if(searchField.val() == default_value) {
				searchField.val('');
			}
		});
		searchField.blur(function() {
			  if(searchField.val() == '') {
					searchField.val(default_value);
			  }
		});

		if (!$.browser.msie || ($.browser.msie && (parseInt($.browser.version, 10) > 8))) {
			var searchBarButton = $("span.search-dropdown-icon");
			var searchBar = $('div.search-bar');
			var menuButton = $("span.nav-open-button");
			var menu = $('.header .primary ul');
			var mobile = false;
			var changed = false;

			$('body').append('<div id="media-query-trigger"></div>');

			function menuWidthCheck() {
				var header_w = $('header .inner').width();
				var elements_w = menu.width() + $('.brand').width();

				if ((header_w < elements_w) || ($(window).width() <= 768)) {
					$('body').addClass('tablet-nav');
				}
				else {
					$('body').removeClass('tablet-nav');
				}

				mobile_old = mobile;
				if ($('#media-query-trigger').css('visibility') == 'hidden') {
					mobile = false;
				}
				else {
					mobile = true;
				}

				if (mobile_old != mobile) {
					changed = true;
				}
				else {
					changed = false;
				}
			}

			menuWidthCheck();

			$(window).resize(function() {
				menuWidthCheck();

				if (!mobile) {
					menu.show();
					searchBar.show();
				}
				else {
					if (changed) {
						menu.hide();
						searchBar.hide();
					}
				}
			});

			/* toggle navigation and search in mobile view */
			searchBarButton.click(function() {
				menu.slideUp();
				searchBar.slideToggle(200);
			});

			menuButton.click(function() {
				searchBar.slideUp();
				menu.slideToggle(200);
			});
		}

		var funnyTitles = [
			'You talking to me?',
			'I never believed it existed!',
			'Clever... Very clever!',
			'Go ahead, make my day.',
			'Show me the money!'
		];

        $('#Form_QueryDictionary_Word').focus();

		// Ajax call for query dictionary
		$('#Form_QueryDictionary_action_doHandleDictionary').click(function (e) {
			e.preventDefault();
			var searchedWord = $('#Form_QueryDictionary_Word').val();

			// @todo: To be changed to a config.
            var url = "http://dictionary-service.simonmallet.com/public/infos/" + searchedWord;

            // resetting results
			$('#word-result').hide();
            $('#word-results-stats').hide();
            $('#word-results-words').html('');
            $('#word-results-title-word').html(searchedWord);
            $('#word-results-title-funny').html(funnyTitles[getRandomInt(0,funnyTitles.length-1)]);

            // Display loading image
            $('.loading-word-results').show();

            $.ajax({
            	type: "GET",
				url: url
			})
			.done(function (response) {
				$('#word-result').show();

				// @todo: The service should return a 404 instead of a 200.
				if (response[0] == "No record found.") {
					$('#word-results-words').html('Whoops! Looks like that word does not exist in this dictionary.');
					return;
				}

				$('#word-results-stats').show();
				$('#stats-word-in-other-definitions').html('');

				response.wordDefinitions.forEach(function(word) {
					$('#word-results-words').append('<div class=word-type>' + word.wordtype + '</div><div class="word-definition">' + word.definition + '</div>');
				});
				var presenceOfLetter = response.statistics.totalWordsInFirstLetter / response.statistics.totalWordsInDictionary * 100;
				$('#stats-percent-letter').html('The letter "'+ searchedWord.charAt(0).toUpperCase() +'" accounts for ' + presenceOfLetter.toPrecision(3) + '% of all words in the dictionary!');

				if (!!response.statistics.wordUsedInOtherDefinitions && response.statistics.wordUsedInOtherDefinitions.length > 0) {
                    $('#stats-word-in-other-definitions').append('The following words mention the word ' + searchedWord + ': ');
                    for (var i = 0; i < response.statistics.wordUsedInOtherDefinitions.length; i++) {
                    	if (i > 5) {
                    		break;
						}
                        $('#stats-word-in-other-definitions').append(response.statistics.wordUsedInOtherDefinitions[i].word + ', ');
					}
				}

                console.log(response.statistics);
			})
			.fail(function (xhr) {
				console.log('failure');
				console.log(xhr);
			})
			.always(function () {
                // Display loading image
                $('.loading-word-results').hide();
			});
		});

        /**
         * Returns a random integer between min (inclusive) and max (inclusive)
         * Using Math.round() will give you a non-uniform distribution!
         */
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
	});
}(jQuery));
