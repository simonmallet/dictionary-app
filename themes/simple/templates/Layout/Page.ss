<% include SideBar %>
<div class="content-container unit size3of4 lastUnit">
	<article>
        <div id="word-result" class="word-result">
            <div class="title">What did we dig up here...</div>
            <div class="words" id="word-results-words"></div>
            <div class="stats" id="word-results-stats"></div>
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