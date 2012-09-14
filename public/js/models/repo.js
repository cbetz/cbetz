window.Repo = Backbone.Model.extend({});

window.RepoCollection = Backbone.Collection.extend({
	model: Repo,
	url:"../api/repos"
});