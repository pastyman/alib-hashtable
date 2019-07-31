'use strict';

/* deps:mocha */
var assert = require('assert');

//init
var hashtable = require('./');
var myHashTable = hashtable('id');

//vars
var data = [
    { id: 'parisvb', name: 'Paris', surname: 'Val Baker' }, 
    { id: 'rowenavb', name: 'Rowena', surname: 'Val Baker' }
];


describe('myHashTable', function () {
    describe('#load()', function () {
        it('should load data into the hashtable:', function () {
            myHashTable.load(data);
            assert.deepEqual(myHashTable.getCollection(), data);
        });
    });

    describe('#getCollection()', function () {
        it('return items as array in hashtable in order:', function () {
            assert.deepEqual(myHashTable.getCollection(), data);
        });
    });    

    describe('#set()', function () {
        it('should update existing item:', function () {
            myHashTable.set({ id: 'parisvb', name: 'Paris', surname: 'Val Baker', age: 44 });
            assert.deepEqual(myHashTable.getCollection(), [{ id: 'parisvb', name: 'Paris', surname: 'Val Baker', age: 44 }, { id: 'rowenavb', name: 'Rowena', surname: 'Val Baker' }]);
        });

        it('should insert new item at end:', function () {
            myHashTable.set({ id: 'tarivb', name: 'Tari', surname: 'Val Baker', age: 14 });
            assert.deepEqual(myHashTable.getCollection(), [{ id: 'parisvb', name: 'Paris', surname: 'Val Baker', age: 44 }, { id: 'rowenavb', name: 'Rowena', surname: 'Val Baker' }, { id: 'tarivb', name: 'Tari', surname: 'Val Baker', age: 14 }]);
        });       
    });  
    
    describe('#get()', function () {
        it('should return existing item', function () {
            assert.deepEqual(myHashTable.get('tarivb'), { id: 'tarivb', name: 'Tari', surname: 'Val Baker', age: 14 });
        });

        it('should return null as item not there', function () {
            assert.equal(myHashTable.get('notthere'), null);
        });      
    });  

    describe('#position()', function () {
        it('should return position of existing item', function () {
            assert.equal(myHashTable.position('tarivb'), 2);
        });

        it('should return null as item not in collection', function () {
            assert.equal(myHashTable.position('notthere'), null);
        });        
    });    
    
    describe('#pop()', function () {
        it('should remove item from end and return it', function () {
            assert.deepEqual(myHashTable.pop(), { id: 'tarivb', name: 'Tari', surname: 'Val Baker', age: 14 });
        });
    }); 
    
    describe('#length()', function () {
        it('get number of items in collection', function () {
            assert.equal(myHashTable.length(), 2);
        });
    });    

    describe('#remove()', function () {
        it('remove item with passed key', function () {
            myHashTable.remove('parisvb');
            assert.deepEqual(myHashTable.getCollection(), [{ id: 'rowenavb', name: 'Rowena', surname: 'Val Baker' }]);
        });
    });     

    describe('#clear()', function () {
        it('empty the hashatble', function () {
            myHashTable.clear();
            assert.deepEqual(myHashTable.getCollection(), []);
        });
    });     
});