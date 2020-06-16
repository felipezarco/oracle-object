
# Oracle Object

Oracle's npm module `oracledb` returns an atypical response in which columns are displayed as a meta-data object separate from the rows. This module helps programmers by turning those into more natural key-valued javascript objects.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/oracle-object.svg)](https://badge.fury.io/js/oracle-object)

[![npm](https://nodei.co/npm/oracle-object.png)](https://www.npmjs.com/package/oracle-object)

### Install

The latest version is available at: https://www.npmjs.com/package/oracle-object

Use your favorite package manager to install:

```
  yarn add oracle-object
```

### Usage

```javascript
oracleObject(result, fn, options)
```

The function receives the result of an execution as the first parameter. This is the only required parameter.


Here's an exemple of an SQL execution with oracledb:

```javascript
 // ...
 const result = await connection.execute(
    `SELECT manager_id, department_id, department_name
      FROM departments
      WHERE manager_id = :id`,
    [103], 
  )
```

As a high-order function, you may pass in a function as the second argument. So that:

```javascript
const patients = oracleObject(result, col => col.toLowerCase(), { allowNull: true }) 
```

The second argument is an optional function or an object which receives each column and modifies it. In the above example the function makes the object keys have the same name as the columns but lower case.

Or if you want to modify the name of each column you could do:

```javascript
 const patients = oracleObject(result, (col) => {
    switch(col) {
      case 'CD_PATIENT': return 'code'
      case 'DS_NAME': return 'name'
      default: return col
    }
  })

```
Given CD_PATIENT and DS_NAME are actual columns, the returned object will look like this:

```javascript

  patients = [
    {
      code: '129831',
      name: 'Luiz Felipe'
      // ...
    },
    {
      code: '129831',
      name: 'Larissa'
      // ...
    },
  ]

```

**Note:** the default return ensures the function does not limit the object keys to the ones in the cases.

Alternatively, if you need no configuration for defaults, the second parameter can be passed more simply as an object:

```javascript

const object = { allowNull: true }

const patients = oracleObject(result, {
  'CD_PATIENT': 'code', 'DS_NAME': 'name'
}, options)

```

The third parameter receives an options object. The option `allowNull: false` is set by default. If you want all props do not forget to add the option.

License MIT @ Felipe Zarco


