<% include SideBar %>
<div class="content-container unit size3of4 lastUnit">
	<article>
        <div class="loading-word-results" id="loading-word-results">
            <div class="loading-title" id="loading-title">
                Loading...
            </div>
            <img src="../mysite/images/ajax-loader.gif">
        </div>
        <div id="word-result" class="word-result">
            <div class="stats" id="word-results-stats">
                <div id="stats-title">Statistics</div>
                <div class="stats-words" id="stats-percent-letter"></div>
                <div class="stats-words" id="stats-word-in-other-definitions"></div>
            </div>
            <div class="title" id="word-results-title-word">Word here</div>
            <div class="title" id="word-results-title-funny">title here</div>
            <div class="words" id="word-results-words"></div>
        </div>
		<h1>$Title</h1>
        <% if $Title == "Home" %>
            <div class="content">$QueryDictionary</div>
        <% else %>
		    <div class="content">$Content</div>
        <% end_if %>
	</article>
		$Form
		$CommentsForm
</div>