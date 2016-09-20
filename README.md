# resource-control [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Authorization for application resources

## Installation

```sh
$ npm install --save resource-control
```

## Use Cases
> Special handlers - should there be one explicitly for each or one generic $ALL catch all
* $ALL_USERS 
* $ALL_ROLES
* $ALL_ACTIONS
* $ALL_RESOURCES
* $ALL_RESOURCETYPES


### [todo]
Don't have entitlements for resource types. instead have entitlement
for "$ALL" resource of that resource type
all users have access to view public recipe catalog; 'admin' role can perform CRUD
```json
    "resourceTypes": {
        "RecipeCatalogs": {
            "allowedActions": ["create", "update", "delete", "read"],
            "entitlements": {
                "users": {
                    "$ALL": {
                      "allowedActions": ["read"]
                      }
                },
                "roles": {
                    "admin": {
                      "allowedActions": ["create", "update", "delete", "read"]
                      }
                }
            }
        },
        "Recipes": {
            "allowedActions": ["post", "vote", "read"],
            "entitlements": {
                "users": {
                    "$ALL": {
                      "allowedActions": ["read"]
                      }
                }
            }
        }
    }
```

### all users have access to view cloud apps

### user can CRUD on "My recipe catalog"

### user can CRUD on all recipes where owner = user (all recipes in "My recipe catalog")


## Usage

```js
var resourceControl = require('resource-control');

resourceControl('Rainbow');
```
## License

Apache-2.0 © [Srikant Tirumalai](https://github.com/srikantkt)


[npm-image]: https://badge.fury.io/js/resource-control.svg
[npm-url]: https://npmjs.org/package/resource-control
[travis-image]: https://travis-ci.org/srikantkt/resource-control.svg?branch=master
[travis-url]: https://travis-ci.org/srikantkt/resource-control
[daviddm-image]: https://david-dm.org/srikantkt/resource-control.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/srikantkt/resource-control
