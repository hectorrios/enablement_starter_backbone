# Starter Backbone.js app

Useful for learning the basics of Backbone.js using Handlebars as the templating engine.

For reference, the syntax for an Handlebars template script tag is:

~~~~	
<script id="todoItemTemplate" type="text/x-handlebars-template">

            <label>
                {{#if completed}}
                <input type="checkbox" checked >
                {{else}}
                <input type="checkbox" >
                {{/if}}
                {{title}}
            </label>

            <button id="delete">Delete</button>

</script>
~~~~
