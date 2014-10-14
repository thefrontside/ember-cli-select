# Ember CLI Custom Select

This is an addon for ember-cli to give you a straightforward easy to use select
component. ember-select does a lot of magic in the background, so we built this
component to clear up some of that magic and make everything very simple and
straight forward. It's a simple wrapper for native select objects to make them
binding aware. Whenever `value` changes, it updates the component.
Whenever you select a new option, it fires off `action`.

Example:
```javascript
{{#custom-select value="bob" action="selectPerson"}}
  {{#custom-option value="fred"}}Fred Flintstone{{/custom-option}}
  {{#custom-option value="bob"}}Bob Newhart{{/custom-option}}
{{/custom-select}}
```

## Installation

* `npm install ember-cli-select`

## Further Reading / Useful Links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

