# unofficial Loot sdk

## Installation

```bash
yarn add loot-sdk    # or npm install loot-sdk
```

## Usage

```ts
import * as Loot from 'loot-sdk';
// or import individual functions, like:
// import { getBag } from 'loot-sdk';

async function logBagInfo(bagId: number) {
  const bag = await Loot.getBag(bagId);
  console.log(bag);
  /*
    outputs to log:
    {
      "id": 77,
      "chest": "Divine Robe",
      "foot": "Leather Boots",
      "hand": "Heavy Gloves",
      "head": "Leather Cap",
      "neck": "Amulet",
      "ring": "Platinum Ring",
      "waist": "Silk Sash",
      "weapon": "Bone Wand",
      "rarityRank": 6169,
      "currentOwner": {
        "address": "0xf73fe15cfb88ea3c7f301f16ade3c02564aca407",
          "bagsHeld": "1",
          "joined": "1630088328"
      },
      "minted": "2021-08-27T18:18:48.000Z"
    }
  */
}
```

## Functions

```ts

// returns a Bag object, containing metadata and information about the current owner
async getBag(bagId: number);

// returns an array of Bag objects with metadata
async getBagsInWallet(address: string);

// returns an array of Transfer objects, including bagIds
async getRecentTransfersForBag(bagId: number);
```
