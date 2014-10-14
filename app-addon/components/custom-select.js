import Ember from "ember";

var assert = Ember.assert;

/**
 * Wraps a native <select> element so that it can be object and
 * binding aware. It is used in conjuction with the
 * `custom-option` component to construct select boxes. E.g.
 *
 *   {{#custom-select value="bob" action="selectPerson"}}
 *     {{custom-option value="fred"}}Fred Flintstone{{/custom-option}}
 *     {{custom-option value="bob"}}Bob Newhart{{/custom-option}}
 *   {{/custom-select}}
 *
 * the options are always up to date, so that when the object bound to
 * `value` changes, the corresponding option becomes selected.
 *
 * Whenever the select tag receives a change event, it will fire
 * `action`
 *
 * @class App.CustomSelectComponent
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  tagName: "select",
  classNameBindings: [":custom-select"],
  attributeBindings: ['disabled', 'tabindex'],

  /**
   * Bound to the `disabled` attribute on the native <select> tag.
   *
   * @property disabled
   * @type Boolean
   * @default false
   */
  disabled: false,

  /**
   * Bound to the `tabindex` attribute on the native <select> tag.
   *
   * @property tabindex
   * @type Integer
   * @ default 1
   */
  tabindex: 1,

  /**
   * The collection of options for this select box. When options are
   * inserted into the dom, they will register themselves with their
   * containing `custom-select`
   *
   * @private
   * @property options
   */
  options: Ember.computed(function() {
    return Ember.A()
  }),

  /**
   * @private
   */
  setup: (function() {
    this.$().on('change', Ember.run.bind(this, function(e) {
      var option = this.get('options').find(function(option) {
        return option.$().is(':selected')
      })
      this.sendAction('action', option.get('value'), this)
    }))
  }).on('didInsertElement'),

  /**
   * @private
   */
  teardown: (function() {
    this.$().off('change')
    //might be overkill, but make sure options can get gc'd
    this.get('options').clear()
  }).on('willDestroyElement'),

  /**
   * @private
   */
  registerOption: function(option) {
    this.get('options').addObject(option);
  },

  /**
   * @private
   */
  unregisterOption: function(option) {
    this.get('options').removeObject(option);
  }
})


/**
 * Used to wrap a native `<option>` tag and associate an object with
 * it that can be bound. It can only be used in conjuction with a
 * containing `custom-select` component
 *
 * @class App.CustomOptionComponent
 * @extends Ember.Component
 */
App.CustomOptionComponent = Ember.Component.extend({
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
