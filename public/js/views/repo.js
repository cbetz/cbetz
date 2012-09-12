window.RepoListView = Backbone.View.extend({
	tagName:'ul',
	className: "thumbnails",
	
	initialize:function () {
		this.model.bind("reset", this.render, this);                
	},
	
	render:function (eventName) {
		_.each(this.model.models, function (repo) {
			$(this.el).append(new RepoListItemView({model:repo}).render().el);
		}, this);
		return this;
	}     
});

window.RepoListItemView = Backbone.View.extend({

	tagName:"li",
	
	template:_.template($('#tpl-repo-list-item').html()),
	   
	render:function (eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}   
});
