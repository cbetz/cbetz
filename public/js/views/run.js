window.RunListView = Backbone.View.extend({
	tagName:'ul',
	
	initialize:function () {
		
		this.model.bind("reset", this.render, this);                
	},
	
	render:function (eventName) {
		_.each(this.model.models, function (run) {
			$(this.el).append(new RunListItemView({model:run}).render().el);
		}, this);
		return this;
	}     
});

window.RunListItemView = Backbone.View.extend({

	tagName:"li",
	   
	render:function (eventName) {
		$(this.el).html(this.template(this.model.toJSON()));
		return this;
	}   
});
