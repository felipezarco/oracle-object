
# Oracle Object

Oracle's npm module `oracledb` returns an atypical response in which columns are displayed as a meta-data object separate from the rows. This module helps programmers by turning those into more natural key-valued javascript objects.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![npm version](https://badge.fury.io/js/oracle-object.svg)](https://badge.fury.io/js/oracle-object) [![Build Status](https://travis-ci.org/felipezarco/oracle-object.svg?branch=master)](https://travis-ci.org/taniarascia/chip8) [![Coverage Status](https://coveralls.io/repos/github/felipezarco/oracle-object/badge.svg?branch=master)](https://coveralls.io/github/taniarascia/chip8?branch=master) ![Dependencies](https://img.shields.io/david/felipezarco/oracle-object) ![Downloads](https://img.shields.io/npm/dw/oracle-object)


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

The function receives the result of an execution as the first parameter. **This is the only required parameter**.

Here's an exemple of an SQL execution with oracledb:

```javascript
 // ...
 const result = await connection.execute(
    `SELECT manager_id, department_id, department_name
      FROM departments
      WHERE manager_id = :id`,
    [23], 
  )
```

This is an example of a normal result from `oracledb`:

```javascript
  const result = {
    metaData: [
      { name: 'manager_id' },
      { name: 'department_id'},
      { name: 'department_name'}
    ],
    rows: [
      ['23', '3842', 'Finances'],
      ['23', '3984', 'Sales'],
      // ...
    ]
  }
```

The simplest usage of `oracle-object` would be:

```javascript
  oracleObject(result) 
```

Which returns:

```javascript
    [
      {
        manager_id: '23',
        department_id: '3842',
        department_name: 'Finances'
      },
      {
        manager_id: '23',
        department_id: '3984',
        department_name: 'Sales'
      }
    ]
```

The second argument is an optional function or an object which receives each column and modifies it. In the example below the function makes the object keys have the same name as the columns but lower cased.

```javascript
const registers = oracleObject(result, col => col.toLowerCase()) 
```

Or, given an example result where CD_PATIENT and DS_NAME are actual database columns, if you want to modify the name of each column you could do:

```javascript
 const patients = oracleObject(result, (col) => {
    switch(col) {
      case 'CD_PATIENT': return 'code'
      case 'DS_NAME': return 'name'
      default: return col
    }
  }, { allowNull: true })

```

An equivalent would be:

```javascript
 const patients = oracleObject(result, {
      'CD_PATIENT': 'code'
      'DS_NAME': 'name'
    }
  }, { allowNull: true, defaultFn: col => col })

```

And the returned object will look like this:

```javascript

  patients = [
    {
      code: '129831',
      name: 'Luiz Felipe'
      // ...
    },
    {
      code: '129831',
      name: 'Larissa',
      // ...
    },
  ]

```

**Note:** the _default_ return ensures the function does not limit the object keys to the ones in the cases.

```javascript

const options = { defaultFn: col => 'not-defined-'+col }

const patients = oracleObject(result, {
  'CD_PATIENT': 'code', 
  'DS_NAME': 'name'
}, options)

```

The third parameter of `oracle-object` receives an options object. 

The option `allowNull: false` is set by default. If you want all props do not forget to add that option.

The option `defaultFn` can be set when using objects instead of functions to apply that function to not specified (or _default_) column names.

License MIT @ Felipe Zarco


