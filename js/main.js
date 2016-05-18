
// In the first few sections, we do all the coding here.
// Later, you'll see how to organize your code into separate
// files and modules.

var Vehicle = Backbone.Model.extend({

    hideMe: function() {
        this.trigger('hey-collection-remove-me', this);
    }
});

var Vehicles = Backbone.Collection.extend({
    model: Vehicle,

    initialize: function() {
        //
    }
});

var VehicleView = Backbone.View.extend({

    tagName: 'li',

    /*
    The "attributes" property can also accept a function that returns an
    Object with the properties that should be added to the top-level EL tag
     */
    attributes: function () {
        return {
            "data-color": this.model.get('color')
        }
    },

    events: {
        'click button': 'removeVehicle'
    },

    initialize: function () {
        /*
        Removing a Model from the collection not only fires the "remove" event on the collection
        but also fires it on the Model that is removed as well. Therefore, we can listen for the
        "remove" here on the VehicleView
         */
        this.model.on('remove', this.remove, this);
    },

    template: (function () {
        var source = $('#vehicle-template').html();
        return Handlebars.compile(source);
    })(),

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    removeVehicle: function() {
        this.model.hideMe();
    }
});

var VehiclesView = Backbone.View.extend({

    tagName: 'ul',

    initialize: function() {
        this.collection.on('hey-collection-remove-me', this.removeModel, this);
    },

    render: function() {
        // debugger;
        this.collection.forEach(function(model) {
            this.addOne(model);
        }, this);

        return this;
    },

    addOne: function (model) {
        var vehicleView = new VehicleView({ 'model': model});
        this.$el.append(vehicleView.render().el);
    },

    removeModel: function(model) {
        console.log('I got the message from you model.');
        this.collection.remove(model);
    }

});

//App Start

var vehicles = new Vehicles([
    {registrationNumber: 'B-12345', color:'red'},
    {registrationNumber: 'C-164645', color:'blue'},
    {registrationNumber: 'D-99999', color:'black'}
]);

//var vehicleView = new VehicleView({ model: vehicles.at(0)});

var vehiclesView = new VehiclesView({ collection: vehicles});

$(document).ready(function() {
    $('#app').html(vehiclesView.render().el);
});
