window.Run = Backbone.Model.extend({});

window.RunCollection = Backbone.Collection.extend({
	model: Run,
	url:"../api/runs",
	parse: function(response) {
		return response.results.activities;
	}
});