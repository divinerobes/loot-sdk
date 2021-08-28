import { getBag, getBagsInWallet } from '../src/api';

describe('getBag', () => {
  it('gets the correct metadata for a bag id', async () => {
    const bag = await getBag(77);
    expect(bag.chest).toEqual('Divine Robe');
    expect(bag.foot).toEqual('Leather Boots');
    expect(bag.hand).toEqual('Heavy Gloves');
    expect(bag.head).toEqual('Leather Cap');
    expect(bag.weapon).toEqual('Bone Wand');
    expect(bag.neck).toEqual('Amulet');
    expect(bag.ring).toEqual('Platinum Ring');
    expect(bag.waist).toEqual('Silk Sash');
  });
  it('converts token ids to numbers', async () => {
    const bag = await getBag(77);
    expect(bag.id).toEqual(77);
  });
  it('includes accurate rarity rank', async () => {
    const bag = await getBag(77);
    expect(bag.rarityRank).toEqual(6169);
  });
  it('converts minted timestamps to dates', async () => {
    const bag = await getBag(77);
    expect(bag.minted).toEqual(new Date(1630088328000));
  });
  it('returns an error when an invalid bag id is used', async () => {
    expect(getBag(9999)).rejects.toThrow('Not found');
  });
});

describe('getBagsInWallet', () => {
  it('gets the correct bags for a wallet', async () => {
    const bags = await getBagsInWallet(
      '0xf73fe15cfb88ea3c7f301f16ade3c02564aca407'
    );
    expect(bags.length).toEqual(1);
    expect(bags[0].id).toEqual(77);
    expect(bags[0].rarityRank).toEqual(6169);
    expect(bags[0].minted).toEqual(new Date(1630088328000));
  });
});
