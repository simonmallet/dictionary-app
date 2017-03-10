<% include SideBar %>
<div class="content-container unit size3of4 lastUnit">
	<article>
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