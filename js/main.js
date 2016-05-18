
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

var TodoItem = Backbone.Model.extend({});

var TodoItems = Backbone.Collection.extend({
    model: TodoItem
});

var TodoItemView = Backbone.View.extend({
    initialize: function() {
        console.log('Initialize on TodoItemView called');
    },

    template: (function () {
        var source = $('#todo-item-template').html();
        return Handlebars.compile(source);
    })(),

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        //console.log(this.el);
        return this;
    }
});

var TodoItemsView = Backbone.View.extend({
    //Assume we have a "collection" property

    initialize: function() {
        this.collection.on('add', this.addOne, this);
    },

    render: function() {
        this.collection.forEach(function(model) {
            this.addOne(model);
        }, this);
    },


    addOne: function(model) {
        var todoItemView = new TodoItemView({"model": model});
        this.$el.append(todoItemView.render().el);
        console.log('The collection EL is: ', this.el);
    }
});

var todoItem = new TodoItem({
    status: 'in-progress',
    description: 'Book flight',
    statusComplete: false
});

var todoItems = new TodoItems([todoItem]);

var todoItemsView = new TodoItemsView({ collection: todoItems});

todoItemsView.render();

todoItems.add(new TodoItem({
    status: 'in-progress',
    description: 'Book Hotel',
    statusComplete: false
}));

$(document).ready(function() {
    $('#app').html(todoItemsView.el);
});
