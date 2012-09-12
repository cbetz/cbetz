window.Repo = Backbone.Model.extend({});

window.RepoCollection = Backbone.Collection.extend({
	model: Repo,
	url:"https://api.github.com/users/cbetz/repos"
});