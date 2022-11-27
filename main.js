import { rotate } from './anim.js';
import init, {
  Allocator
} from './pkg/allocate_items.js';
console.log(Allocator);

console.log("Initializing WASM");
await init();
console.log("Finished initializing WASM");

const square = document.getElementById('spinner');
rotate(square);

const count = 10000000;

console.log(`Creating ${count} item array`);
const items = new Array(count);
for (let i = 0; i < count; i++) {
  items[i] = {
    counter: 0
  };
}
console.log(`Finished creating ${count} item array`);

console.log(`Creating Rust Allocator`);
const allocator = new Allocator();
console.log(`Created Rust Allocator`, allocator);

const conservativeButton = document.getElementById('conservative');
conservativeButton.addEventListener('click', () => {
  console.log('Conservative Increment');

  for (let i = 0; i < items.length; i++) {
    items[i].counter = items[i].counter + 1;
  }

  console.log('Conservative Increment Done');

});


const wastefulButton = document.getElementById('wasteful');
wastefulButton.addEventListener('click', () => {
  console.log('Wasteful Increment');

  for (let i = 0; i < items.length; i++) {
    items[i] = {
      counter: items[i].counter + 1
    };
  }
  console.log('Wasteful Increment Done');
});


const conservativeRustButton = document.getElementById('conservative_rust');
conservativeRustButton.addEventListener('click', () => {
  console.log('Conservative Rust Increment');

  allocator.conservative_allocation();

  console.log('Conservative Rust Increment Done');

});


const wastefulRustButton = document.getElementById('wasteful_rust');
wastefulRustButton.addEventListener('click', () => {
  console.log('Wasteful Rust Increment');

  allocator.wasteful_allocation();

  console.log('Wasteful Rust Increment Done');
});
