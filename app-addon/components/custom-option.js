import Ember from "ember";

var assert = Ember.assert;

/**
 * Used to wrap a native `<option>` tag and associate an object with
 * it that can be bound. It can only be used in conjuction with a
 * containing `custom-select` component
 *
 * @class App.CustomOptionComponent
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  tagName: 'option',
  attributeBindings: ['selected', 'name', 'disabled'],
  classNameBindings: [':custom-option'],

  /**
   * The value associated with this option. When this option is
   * selected, the `custom-select` will fire its action with this
   * value.
   *
   * @property value
   * @type Object
   * @default null
   */
  value: null,

  /**
   * Property bound to the `selected` attribute of the native
   * `<option>` element. It is aware of the containing `Custom-select`'s
   * value and will mark itself if it is the same.
   *
   * @private
   * @property selected
   * @type Boolean
   */
  selected: Ember.computed('select.value', function() {
    return this.get('value') == this.get('select.value')
  }),

  /**
   * @private
   */
  registerWithSelect: (function() {
    var select = this.nearestOfType(App.CustomSelectComponent);
    assert("custom-option component declared without enclosing custom-select", !!select)
    this.set('select', select)
    select.registerOption(this)
  }).on('didInsertElement'),

  /**
   * @private
   */
  unregisterWithSelect: (function() {
    this.get('select').unregisterOption(this)
  }).on('willDestroyElement')
})
