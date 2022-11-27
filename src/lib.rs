use wasm_bindgen::prelude::*;

const COUNT: usize = 10_000_000;

#[wasm_bindgen]
#[derive(Default)]
pub struct Allocator {
    items: Vec<Item>,
}

#[wasm_bindgen]
impl Allocator {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Allocator {
        Allocator {
            items: vec![Item { counter: 0 }; COUNT],
        }
    }

    pub fn conservative_allocation(&mut self) {
        for item in self.items.iter_mut() {
            item.counter += 1;
        }
    }

    pub fn wasteful_allocation(&mut self) {
        for (index, item) in self.items.to_owned().iter_mut().enumerate() {
            self.items[index] = Item {
                counter: item.counter + 1,
            }
        }
    }
}

pub struct Item {
    counter: i32,
}

impl Copy for Item {}

impl Clone for Item {
    fn clone(&self) -> Item {
        Item {
            counter: self.counter,
        }
    }
}

#[cfg(test)]
mod tests {

    #[test]
    fn test_conservative_allocation() {
        use crate::Allocator;
        let mut allocator = Allocator::new();
        allocator.conservative_allocation();
    }

    #[test]
    fn test_wasteful_allocation() {
        use crate::Allocator;
        let mut allocator = Allocator::new();
        allocator.wasteful_allocation();
    }
}
