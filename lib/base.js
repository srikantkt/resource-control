'use strict';

var ArrayUtil = require('./utils');

const DEFAULT_ACTIONS = ['create', 'read', 'update', 'delete'];
const GLOBAL_ID_NAMESPACE = 'globalIdentityNamespace';
const IDENTITY_ENUMS = ['user', 'group', 'role'];

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

    get id() {
      if (this.hasOwnProperty('_id')) {
        return this._id;
      }
    }

    get allowedActions() {
        return this._allowedActions;
    }
}

/**
 * This is an instance of a resource object. For example, a "Document" called "paper.doc"
 * @param type is the resource type
 * @param resourceId is the named resource; this entity is persisted elsewhere
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

    get resourceType() {
      return this._type;
    }

    get resourceId() {
      return this._id;
    }
}

/**
 * Identity is the encapsulation for any entity that is representative of end users.
 * This includes user or group of users from an identity repository, roles from a
 * functional system used for authorization
 *
 */
class _BaseIdentity {
    constructor(identity) {
        if (identity.hasOwnProperty('name') && identity.hasOwnProperty('name')) {
          if (typeof identity.type === 'string') {
            // type needs to be one of the recognized values
            if (ArrayUtil.intersection(IDENTITY_ENUMS, [identity.type]).length > 0) {
              this._type = identity.type;
            }
          }
          else {
            throw new TypeError("Mandatory attribute 'type' (" + identity
                  + ") is invalid. Valid values are : " + IDENTITY_ENUMS);
          }
          this._name = identity.name;
          if (identity.hasOwnProperty('id')) {
            this._id = identity.id;
          }
          else {
            this._id = identity.name;
          }
          if (identity.hasOwnProperty('namespace')) {
            this._namespace = identity.namespace;
          }
          else {
            this._namespace = GLOBAL_ID_NAMESPACE;
          }
        }
        else {
          throw new TypeError("Mandatory attributes in object are missing: " + identity);
        }
    }

    get name() {
      return this._name;
    }

    get id() {
      return this._id;
    }

    get type() {
      return this._type;
    }

    get namespace() {
      return this._namespace;
    }
}

/**
 * Primarily for policy authoring. This is the object to do policy management
 *  Policy = [grant|deny] <Identity.type.id> <ResourceType.resourceId> <allowedActions>
 *  for example, grant user.john Documents.ALL [read]
 *
 */
class _BasePolicy {
    constructor() {
        this._policySet = {};
    }
    
    /**
     * adds a new policy to the model
     * {
     *  identity: [<identities>],
     *  resource: {
     *              resourceType: <ResourceType>
     *              resourceId: <resourceId>
     *            }
     *  grant: {
     *           allowedActions: [<action list>]
     *         }
     * }
     */
    add(identity, resource, grant) {
      if (identity instanceof _BaseIdentity) {
        this._policySet.add();
      }
      else {
        throw new TypeError("Invalid argument type for identity: " + identity);
      }
    }
}

module.exports = { _BaseResourceType, _BaseResource, _BaseIdentity };

/**
 * Authorizer initialization
 * Authorizer = new Authorizer(Policy)
 * User = new Identity('adminUser') 
 * user = Authorizer.enable(User)
 * 
 * add methods to the Identity objects for capability check
 * user.may('read', resourceId)
 * 
 * add methods to resource objects for assignment 
 * ['adminUser', 'jon'] = resource.allows('read')
 * ['read'] = resource.allows(identity)
 */