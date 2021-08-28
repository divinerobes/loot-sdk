export type Bag = {
  id: number;
  chest: string;
  foot: string;
  hand: string;
  head: string;
  neck: string;
  ring: string;
  waist: string;
  weapon: string;
  rarityRank: number;
  currentOwner: Wallet;
  minted: Date;
};

export type Wallet = {
  address: string;
  bagsHeld: number;
  bags: Bag[];
  joined: Date;
};

export type Transfer = {
  bag: Bag;
  from: Wallet;
  to: Wallet;
  txHash: string;
  timestamp: Date;
};
