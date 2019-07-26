# alib-hashtable
> A Javascript hashtable implementation

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm i alib-hashtable --save
```

## Usage

```js
const hashtable = require('alib-hashtable');

//new instance
const myHashTable = hashtable('id');
```
id refers to the key prop name for any added objects.

Load items - used to initially fill the hashtable with objects

```js
myHashTable.load([{id:'parisvb', name:'Paris', surname:'Val Baker'}, {id:'rowenavb', name:'Rowena', surname:'Val Baker'}])
```

set - inserts an item or if an item is there with matching key updates existing
```js
myHashTable.set({id:'parisvb', name:'Paris', surname:'Val Baker', age: 44});
```

set can optionally be sent a compare function to set the items position

get - Returns the object with the associated key
```js
myHashTable.get('parisvb');
//=> {id:'parisvb', name:'Paris', surname:'Val Baker', age: 44}
```
position - Returns the position of the object with the associated key, if not found it returns null

```js
myHashTable.position('rowenavb');
//=> 1
```

remove - Removes an object with the associated key from the hashtable
```js
myHashTable.remove('parisvb');
```

pop - Removes an object from end of hashtable and returns it
```js
myHashTable.pop();
//=> {id:'rowenavb', name:'Rowena', surname:'Val Baker'}
```

length - Returns number of items in hashtable
```js
myHashTable.length();
//=> 2
```

clear - Empties the hashtable
```js
myHashTable.clear();
```

getCollection - Returns array of objects in the hashtable in order
```js
myHashTable.getCollection();
//=> [{id:'parisvb', name:'Paris', surname:'Val Baker', age: 44}, {id:'rowenavb', name:'Rowena', surname:'Val Baker'}]
```