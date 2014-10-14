'use strict';

var path = require("path");
var fs = require("fs");

function EmberCLISelect(project) {
    this.project = project;
    this.name    = 'Ember CLI Select';
}

function unwatchedTree(dir) {
    return {
      read:    function() { return dir; },
      cleanup: function() { }
    };
}

EmberCLISelect.prototype.treeFor = function treeFor(name) {
  var treePath =  path.join('node_modules', 'ember-cli-select', name + '-addon');

  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

module.exports = EmberCLISelect;
