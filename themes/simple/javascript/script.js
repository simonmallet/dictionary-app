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

		// Ajax call for query dictionary
		$('#Form_QueryDictionary_action_doHandleDictionary').click(function (e) {
			e.preventDefault();

            var url = "http://dictionary-service.simonmallet.com/public/infos/" + $('#Form_QueryDictionary_Word').val();

            // resetting results
			$('#word-result').hide();
            $('#word-results-words').html('');

            $.ajax({
            	type: "GET",
				url: url
            	})
                .done(function (response) {
                    $('#word-result').show();
                	console.log('success');
                	console.log(response);

                	if (response[0] == "No record found.") {
                        $('#word-results-words').html('Whoops! Looks like that word does not exist in this dictionary.');
                		return;
					}

					response.wordDefinitions.forEach(function(word) {
						$('#word-results-words').append('<div class=word-type>' + word.wordtype + '</div><div class="word-definition">' + word.definition + '</div>');
					});
					console.log(response.statistics);
                })
                .fail(function (xhr) {
                	console.log('failure');
					console.log(xhr);
                });
		});
	});
}(jQuery));
