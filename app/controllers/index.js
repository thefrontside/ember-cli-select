import Ember from 'ember';

export default Ember.Controller.extend({
  value: "bob",
  counter: 0,
  actions: {
    change: function(){
      if(this.get("value") === "bob"){
        this.set("value", "fred");
      }
      else {
        this.set("value", "bob");
      }
    },
    /* jshint unused:false */
    selectOption: function(option){
      this.set("counter", this.get("counter")+1);
    }
  }
});
