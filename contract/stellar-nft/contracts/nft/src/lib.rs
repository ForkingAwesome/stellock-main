#![no_std]

use soroban_sdk::{contract, contractimpl, contracttype, symbol_short, Address, Env, Map, Symbol};

#[contract]
pub struct NonTransferableNFT;

const OWNERS: Symbol = symbol_short!("owners");
const COUNT: Symbol = symbol_short!("count");

#[derive(Clone)]
#[contracttype]
pub struct NFT {
    pub id: i128,
    pub owner: Address,
    pub metadata: Symbol,
}

#[contractimpl]
impl NonTransferableNFT {
    pub fn initialize(env: Env) {
        let owners: Map<Address, NFT> = Map::new(&env);

        env.storage().persistent().set(&OWNERS, &owners);
        env.storage().persistent().set(&COUNT, &0i128);
    }

    pub fn mint(env: Env, owner: Address, metadata: Symbol) {
        let nft_count: i128 = env.storage().persistent().get(&COUNT).unwrap_or(0);

        let new_nft = NFT {
            id: nft_count,
            owner: owner.clone(),
            metadata,
        };

        let mut owners: Map<Address, NFT> = env
            .storage()
            .persistent()
            .get(&OWNERS)
            .unwrap_or(Map::new(&env));

        owners.set(owner, new_nft);

        env.storage().persistent().set(&OWNERS, &owners);
        env.storage().persistent().set(&COUNT, &(nft_count + 1));
    }

    pub fn get_nft(env: Env, address: Address) -> Option<NFT> {
        let owners: Map<Address, NFT> = env
            .storage()
            .persistent()
            .get(&OWNERS)
            .unwrap_or(Map::new(&env));

        owners.get(address)
    }
}
