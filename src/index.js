import HashMap from './HashMap';
import Node from './node';

const map = new HashMap();

map.set('John', 'Wayne');
map.set('Brad', 'Pitt');

console.log(map);

console.log(map.has('Brad'));
