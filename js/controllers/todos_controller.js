Todos.TodosController = Ember.ArrayController.extend({ 
  actions: { 
    createTodo: function() { 
      // Get the values submitted by the action 
      var title = this.get('newTitle'); 
      if(!title.trim()) { return; } 

      // Create a new todo model 
      var todo = this.store.createRecord('todo', { 
        title: title,  
        isCompleted: false 
      }); 

      // Clear the "New Todo" text field 
      this.set('newTitle', ''); 

      // Save the model 
      todo.save(); 
    }, 

  },

  remaining: function() {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function() {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining')
}); 