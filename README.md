
## Oracle Object

Oracle's npm module oracledb returns an atypical response in which columns are displayed in a meta-data object.

This module helps programmers by turning those into more natural key-value javascript objects.

### Usage

```javascript
oracleObject(result, fn, options)
```

The function receives the result of an execution as the first parameter.

The second argument is an optional function which receives each column and modifies it.

```javascript
 // ...
 const result = await connection.execute(
    `SELECT manager_id, department_id, department_name
      FROM departments
      WHERE manager_id = :id`,
    [103], 
  )
```

As a high-order function you may pass in a function as the second parameter.

```javascript
 const patients = oracleObject(result, (col) => {
    switch(col) {
      case 'cd_pacient': return 'code'
      case 'ds_name': return 'name'
      default: return col
    }
  })

```
Given CD_PATIENT and DS_NAME are actual columns.The returned object will look like this:

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

The third parameter receives an options object. The option `allowNull: false` is set by default.

License MIT @ Felipe Zarco


