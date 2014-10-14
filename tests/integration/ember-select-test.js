import startApp from "../helpers/start-app";
import Ember from 'ember';

var App;

module('integration:ember-select', {
  needs: ["controller:index"],
  setup: function() { App = startApp(); },
  teardown: function() { Ember.run(App, App.destroy); }
});

test('shows the ember-select box', function() {
  expect(1);

  visit('/');

  andThen(function() {
    ok($(".custom-select").length);
  });
});

test('has two options', function() {
  expect(1);

  visit('/');

  andThen(function() {
    ok($(".custom-option").length === 2);
  });
});

test('has the correct text for the options', function() {
  expect(2);

  visit('/');

  andThen(function() {
    ok($(".custom-option:first").text() === "Fred Flintstone");
    ok($(".custom-option:last").text() === "Bob Newhart");
  });
});

test('has the correct value for the options', function() {
  expect(1);

  visit('/');

  andThen(function() {
    ok($(".spec-value").text() === "bob");
  });
});

test('binds the value to the select box', function() {
  expect(2);

  visit('/');

  andThen(function() {
    $(".change-value").click();
    ok($(".spec-value").text() === "fred");
    $(".change-value").click();
    ok($(".spec-value").text() === "bob");
  });
});

/* TODO: Can't figure out how to run the event synchronously
test('it triggers the action on select', function() {
  expect(2);

  visit('/');

  andThen(function() {
    $(".custom-select").trigger("change");
    ok($(".spec-counter").text() === "1");
    $(".custom-select").trigger("change");
    ok($(".spec-counter").text() === "2");
  });
});
*/
