import HashMap from './hashMap';

const map = new HashMap();

map.set('John', 'Wayne');
map.set('Brad', 'Pitt');

console.log(map);

console.log(map.length());

map.clear();
// map.remove('Brad');

console.log(map.length());

console.log(map.has('Brad'));
