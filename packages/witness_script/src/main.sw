script;

use std::{
    tx::tx_witness_data
};

fn main(witness_index: u64) -> bool {
    let witness_data: u64 = tx_witness_data(witness_index);
    log(witness_data);
    true
}
