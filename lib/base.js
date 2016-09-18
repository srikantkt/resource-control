'use strict';

var ArrayUtil = require('./utils');

const DEFAULT_ACTIONS = ['create', 'read', 'update', 'delete'];
/**
 * A resource type represents an application resource. For example, a "document", a 
 * "catalog" or an "account"
 * @param name is the name of the resource type
 * @param allowedActions - an array of allowed action names. If only a single string
 *        is provided, then it is treated as the only allowed action. When no action list
 *        is supplied, then the default is ['create', 'read', 'update', 'delete']
 */
class _BaseResourceType {
    constructor(name, allowedActions) {
        this._name = name;
        if (allowedActions) {
            if (ArrayUtil.isArray(allowedActions)) {
                this._allowedActions = allowedActions.filter(function(element) {
                    return (typeof element === 'string');
                });
                if (this._allowedActions.length === 0) {
                    throw new TypeError("invalid action list ==> " + allowedActions);
                }
            } else {
                if (typeof allowedActions === "string") {
                    this._allowedActions = [allowedActions];
                } else {
                    throw new TypeError("invalid action list ==> " + allowedActions);
                }
            }
        } else {
            this._allowedActions = DEFAULT_ACTIONS;
        }
    }

    get name() {
        return this._name;
    }

    get allowedActions() {
        return this._allowedActions;
    }
}

/**
 * This is an instance of a resource object. For example, a "Document" called "paper.doc"
 * @param type is the resource type
 * @param resourceId is the named resource
 * @actionList is this resource's subset of the allowed actions validated against the 
 *             action list from the resource type   
 */
class _BaseResource {
    constructor(type, resourceId, actionList) {
        if (type instanceof _BaseResourceType) {
            this._type = type;
            this._id = resourceId;
            if (actionList) {
                let al = ArrayUtil.intersection(type._allowedActions, actionList);
                if (al.length) {
                    this._actionList = ArrayUtil.intersection(type._allowedActions, actionList);
                } else {
                    this._actionList = type._allowedActions;
                }
            } else {
                this._actionList = type._allowedActions;
            }
        } else {
            throw new TypeError("Resource type specification is invalid: " + type);
        }
    }
}

class _Identity {
    constructor(identity) {
        this._type = identity.type;
        this._id = identity.id;
        this._domain = identity.domain
    }

}

class _Permission {
    constructor() {

    }
}

module.exports = { _BaseResourceType, _BaseResource };