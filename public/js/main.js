window.Router = Backbone.Router.extend({

    routes: {
        "": "home",
		"about": "about",
		"projects": "projects",
		"resume": "resume",
        "contact": "contact"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.header').html(this.headerView.render().el);
    },

    home: function () {
        // Since the home view never changes, we instantiate it and render it only once
        if (!this.homeView) {
            this.homeView = new HomeView();
            this.homeView.render();
        } else {
            this.homeView.delegateEvents(); // delegate events when the view is recycled
        }
        $("#content").html(this.homeView.el);
        this.headerView.select('menu-home');
    },

    resume: function () {
        if (!this.resumeView) {
            this.resumeView = new ResumeView();
            this.resumeView.render();
        }
        $('#content').html(this.resumeView.el);
        this.headerView.select('menu-resume');
    },
	
	contact: function () {
        if (!this.contactView) {
            this.contactView = new ContactView();
            this.contactView.render();
        }
        $('#content').html(this.contactView.el);
        this.headerView.select('menu-contact');
    }
});

templateLoader.load(["HomeView", "HeaderView", "ResumeView", "ContactView"],
    function () {
        app = new Router();
        Backbone.history.start();
});