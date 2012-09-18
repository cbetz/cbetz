window.Run = Backbone.Model.extend({});

window.RunCollection = Backbone.Collection.extend({
	model: Run,
	url:"../api/runs"
});