"use strict";

//hashtable implimentation
module.exports = function alibHashtable(key) {
  var keys = [];
  var objects = [];

  function load(objectList) {
    keys.length = 0;
    objects.length = 0;

    for (var i = 0; i < objectList.length; i++) {
      keys.push(objectList[i][key]);
      objects.push(objectList[i]);
    }
  }

  function set(item, sortFunc) {
    var insertPos = keys.length;
    var moved = false;
    var i = keys.indexOf(item[key]);
    var iSearch = 0;

    if (i === -1) {
      //item not there, add
      if (!sortFunc) {
        //add to end
        keys.push(item[key]);
        objects.push(item);
        insertPos = keys.length - 1;
      } else {
        //often item being inserted belongs on end, check
        if (
          objects.length > 0 &&
          sortFunc(item, objects[objects.length - 1]) === 1
        ) {
          //item belongs on end - add to end
          keys.push(item[key]);
          objects.push(item);
          insertPos = keys.length - 1;
        } else {
          //find insert position
          for (iSearch = 0; iSearch < objects.length; iSearch++) {
            if (sortFunc(objects[iSearch], item) > -1) {
              //found larger or same size item so stop and recorded insert pos (splice places behind at selected index)
              insertPos = iSearch;
              break;
            }
          }
          //insert at pos
          keys.splice(insertPos, 0, item[key]);
          objects.splice(insertPos, 0, item);
        }
      }
    } else {
      //item there, update
      if (!sortFunc) {
        //update existing
        objects[i] = item;
        insertPos = i;
      } else {
        //first check if position changed
        if (sortFunc(objects[i], item) === 0) {
          //position not changed so just update inplace
          objects[i] = item;
          insertPos = i;
        } else {
          //position has changed - remove and reinsert
          moved = true;

          //first remove
          keys.splice(i, 1);
          objects.splice(i, 1);

          //find insert position
          for (iSearch = 0; iSearch < objects.length; iSearch++) {
            if (sortFunc(objects[iSearch], item) > -1) {
              //found larger or same size item so stop and record insert pos (splice places behind at selected index)
              insertPos = iSearch;
              break;
            }
          }

          //insert at pos
          keys.splice(insertPos, 0, item[key]);
          objects.splice(insertPos, 0, item);
        }
      }
    }

    return {
      position: insertPos,
      moved: moved
    };
  }

  function get(keyValue) {
    var i = keys.indexOf(keyValue);
    if (i === -1) {
      //item not there - return null
      return null;
    } else {
      //return item
      return objects[i];
    }
  }

  function position(keyValue) {
    var i = keys.indexOf(keyValue);
    if (i === -1) {
      //item not there - return null
      return null;
    } else {
      //return position
      return i;
    }
  }

  function remove(keyValue) {
    var i = keys.indexOf(keyValue);
    if (i !== -1) {
      //item there, remove it
      keys.splice(i, 1);
      objects.splice(i, 1);
    }
  }

  function pop() {
    if (keys.length > 0) {
      //something there, pop it and return
      keys.pop();
      var data = objects.pop();
      return data;
    } else {
      return null;
    }
  }

  function length() {
    return keys.length;
  }

  function clear() {
    keys.length = 0;
    objects.length = 0;
  }

  function getCollection() {
    return objects;
  }

  return {
    load: load,
    set: set,
    get: get,
    remove: remove,
    pop: pop,
    length: length,
    clear: clear,
    position: position,
    getCollection: getCollection
  };
};
