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

    clearCompleted: function() { 
      var completed = this.filterBy('isCompleted', true); 
      completed.invoke('deleteRecord'); 
      completed.invoke('save'); 
    }

  },

  hasCompleted: function() { 
    return this.get('completed') > 0; 
  }.property('completed'),

  remaining: function() {
    return this.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function() {
    var remaining = this.get('remaining');
    return remaining === 1 ? 'item' : 'items';
  }.property('remaining'), 
  completed: function() { 
    return this.filterBy('isCompleted', true).get('length'); 
  }.property('@each.isCompleted'), 

  allAreDone: function(key, value) { 
    if(value === undefined) { 
      return !!this.get('length') && this.isEvery('isCompleted'); 
    } else { 
      this.setEach('isCompleted', value); 
      this.invoke('save'); 
      return value; 
    }
  }.property('@each.isCompleted')
}); 