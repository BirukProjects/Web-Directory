/*global jQuery, describe, beforeEach, afterEach, it, module, inject, expect */

describe('Service: ivhTreeviewMgr', function() {
  'use strict';

  beforeEach(module('ivh.treeview'));

  var ivhTreeviewMgr;

  var tree
    , nodes
    , stuff
    , hats
    , fedora
    , flatcap
    , bags
    , messenger
    , backpack;

  beforeEach(inject(function(_ivhTreeviewMgr_) {
    ivhTreeviewMgr = _ivhTreeviewMgr_;
  }));

  beforeEach(function() {
    tree = [{
      label: 'Stuff',
      id: 'stuff',
      children: [{
        label: 'Hats',
        id: 'hats',
        children: [{
          label: 'Fedora',
          id: 'fedora'
        },{
          label: 'Flatcap',
          id: 'flatcap'
        }]
      },{
        label: 'Bags',
        id: 'bags',
        children: [{
          label: 'Messenger',
          id: 'messenger'
        },{
          label: 'Backpack',
          id: 'backpack'
        }]
      }]
    }];

    stuff = tree[0];
    hats = stuff.children[0];
    bags = stuff.children[1];
    fedora = hats.children[0];
    flatcap = hats.children[1];
    messenger = bags.children[0];
    backpack = bags.children[1];

    nodes = [hats, bags, fedora, flatcap, messenger, backpack];
  });

  describe('#select', function() {
    
    it('should select all child nodes', function() {
      ivhTreeviewMgr.select(tree, hats);
      expect(fedora.selected).toBe(true);
      expect(flatcap.selected).toBe(true);
    });

    it('should select nodes by id', function() {
      ivhTreeviewMgr.select(tree, 'hats');
      expect(fedora.selected).toBe(true);
      expect(flatcap.selected).toBe(true);
    });

    it('should make parents indeterminate if there are unselected siblings', function() {
      ivhTreeviewMgr.select(tree, fedora);
      expect(stuff.__ivhTreeviewIndeterminate).toBe(true);
      expect(stuff.selected).toBe(false); // Indeterminte nodes are not selected
      expect(hats.__ivhTreeviewIndeterminate).toBe(true);
      expect(hats.selected).toBe(false); // Indeterminte nodes are not selected
    });

  });

  describe('#selectAll', function() {
    
    it('should select all nodes in a tree', function() {
      ivhTreeviewMgr.selectAll(tree);
      nodes.forEach(function(n) {
        expect(n.selected).toBe(true);
        expect(n.__ivhTreeviewIndeterminate).toBe(false);
      });
    });

  });

  describe('#selectEach', function() {
    
    it('should select with an array of node references', function() {
      ivhTreeviewMgr.selectEach(tree, [flatcap, bags]);
      [flatcap, bags, messenger, backpack].forEach(function(n) {
        expect(n.selected).toBe(true);
      });
      [stuff, hats, fedora].forEach(function(n) {
        expect(n.selected).not.toBe(true);
      });
    });

    it('should select with an array of node ids', function() {
      ivhTreeviewMgr.selectEach(tree, ['flatcap', 'bags']);
      [flatcap, bags, messenger, backpack].forEach(function(n) {
        expect(n.selected).toBe(true);
      });
      [stuff, hats, fedora].forEach(function(n) {
        expect(n.selected).not.toBe(true);
      });
    });

  });

  describe('#deselect', function() {

    beforeEach(function() {
      angular.forEach(nodes, function(n) {
        n.selected = true;
      });
    });
    
    it('should deselect all child nodes', function() {
      ivhTreeviewMgr.deselect(tree, hats);
      expect(fedora.selected).toBe(false);
      expect(flatcap.selected).toBe(false);
    });

    it('should make parents indeterminate if there are selected siblings', function() {
      ivhTreeviewMgr.deselect(tree, hats);
      expect(stuff.__ivhTreeviewIndeterminate).toBe(true);
      expect(stuff.selected).toBe(false); // Indeterminte nodes are not selected
    });

  });

  describe('#deselectAll', function() {
    beforeEach(function() {
      nodes.forEach(function(n) {
        n.selected = true;
      });
    });
    
    it('should deselect all nodes in a tree', function() {
      ivhTreeviewMgr.deselectAll(tree);
      nodes.forEach(function(n) {
        expect(n.selected).toBe(false);
        expect(n.__ivhTreeviewIndeterminate).toBe(false);
      });
    });

  });

  describe('#deselectEach', function() {
    beforeEach(function() {
      angular.forEach(nodes, function(n) {
        n.selected = true;
      });
    });
    
    it('should deselect with an array of node references', function() {
      ivhTreeviewMgr.deselectEach(tree, [flatcap, bags]);
      [stuff, hats, flatcap, bags, messenger, backpack].forEach(function(n) {
        expect(n.selected).toBe(false);
      });
      [fedora].forEach(function(n) {
        expect(n.selected).toBe(true);
      });
    });

    it('should deselect with an array of node ids', function() {
      ivhTreeviewMgr.deselectEach(tree, ['flatcap', 'bags']);
      [stuff, hats, flatcap, bags, messenger, backpack].forEach(function(n) {
        expect(n.selected).toBe(false);
      });
      [fedora].forEach(function(n) {
        expect(n.selected).toBe(true);
      });
    });

  });

  describe('#validate', function() {
    
    it('should assume selected state by default', function() {
      angular.forEach(nodes, function(n) {
        n.selected = true;
      });
      hats.selected = false;
      ivhTreeviewMgr.validate(tree);

      expect(stuff.selected).toBe(false);
      expect(stuff.__ivhTreeviewIndeterminate).toBe(true);

      expect(hats.selected).toBe(false);
      expect(hats.__ivhTreeviewIndeterminate).toBe(false);

      expect(bags.selected).toBe(true);
      expect(bags.__ivhTreeviewIndeterminate).toBe(false);

      expect(fedora.selected).toBe(false);
      expect(fedora.__ivhTreeviewIndeterminate).toBe(false);

      expect(flatcap.selected).toBe(false);
      expect(flatcap.__ivhTreeviewIndeterminate).toBe(false);

      expect(messenger.selected).toBe(true);
      expect(messenger.__ivhTreeviewIndeterminate).toBe(false);

      expect(backpack.selected).toBe(true);
      expect(backpack.__ivhTreeviewIndeterminate).toBe(false);
    });

  });

});

