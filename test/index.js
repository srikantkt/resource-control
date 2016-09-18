'use strict';

var assert = require('assert');
var resourceControl = require('../lib');

var ArrayUtil = require('../lib/utils');

describe('resource-control', function() {
    it('should be able to create default ResourceType & Resource', function() {
        var rt = new resourceControl.ResourceType("Accounts");
        var rid = new resourceControl.Resource(rt, 'myAccount');

        assert(true);
    });
    it("should create Resource with actionList that doesn't match resourceType", function() {
        var rt = new resourceControl.ResourceType("Accounts");
        var rid = new resourceControl.Resource(rt, 'myAccount', ['view']);

        assert(true);
    });
    it("should create Resource with actionList that intersects resourceType", function() {
        var rt = new resourceControl.ResourceType("Accounts");
        var rid = new resourceControl.Resource(rt, 'myAccount', ['create', 'update']);

        assert(true);
    });
    it("should create Resource from resourceType with custom action list", function() {
        var rt = new resourceControl.ResourceType("Accounts", ['view', 'comment']);
        var rid = new resourceControl.Resource(rt, 'myAccount', ['comment', 'update']);

        assert(true);
    });
    it("should create Resource from resourceType from single string", function() {
        var rt = new resourceControl.ResourceType("Accounts", 'view');
        var rid = new resourceControl.Resource(rt, 'myAccount', ['view', 'update']);

        assert(true);
    });
    it("should create Resource & test resource type name and actions", function() {
        var rt = new resourceControl.ResourceType("Accounts", ['view', 'update']);
        assert(rt.name === 'Accounts');
        assert(ArrayUtil.isArray(rt.allowedActions));
    });
    it("should fail to create resourceType - invalid action list", function() {
        try {
            var rt = new resourceControl.ResourceType("Accounts", 123);
            assert(false, "invalid error");
        } catch (ex) {
            if (typeof ex === 'TypeError') {
                assert(true);
            }
        }
    });
    it("should fail to create resourceType - action list is array of numbers", function() {
        try {
            var rt = new resourceControl.ResourceType("Accounts", [{}, 123]);
            assert.fail("object", "exception", "Object created with invalid input!");
        } catch (ex) {
            if (typeof ex === 'TypeError') {
                assert(true, "caught expected TypeError exception");
            }
        }
    });
    it("should fail to create resource - invalid resource type", function() {
        try {
            var rid = new resourceControl.Resource("random input", 'myAccount', ['view', 'update']);

            assert.fail("object", "exception", "Object created with invalid input!");
        } catch (ex) {
            if (typeof ex === 'TypeError') {
                assert(true, "caught expected TypeError exception");
            }
        }
    });
});