import { getRecentTransfersForBag } from '../src/api';

describe('getRecentTransfersForBag', () => {
  it('gets the recent transfers for a bag', async () => {
    const transfers = await getRecentTransfersForBag(77);
    expect(transfers.length).toEqual(1);
    expect(transfers[0].bag.id).toEqual(77);
  });
});
