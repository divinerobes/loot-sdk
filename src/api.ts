import { gql, request } from 'graphql-request';
import { Variables } from 'graphql-request/dist/types';
import { Bag, Transfer } from './types';
//@ts-ignore
import Rarity from './data/rarity';

const API_URL = 'https://api.thegraph.com/subgraphs/name/shahruz/loot';

export const graphRequest = (query: string, variables?: Variables) => {
  return request(API_URL, query, variables);
};

export const getBag = async (id: number): Promise<Bag> => {
  let { bag } = await graphRequest(
    gql`
      query Bag($id: ID!) {
        bag(id: $id) {
          id
          chest
          foot
          hand
          head
          neck
          ring
          waist
          weapon
          currentOwner {
            address
            bagsHeld
            joined
          }
          minted
        }
      }
    `,
    { id }
  );
  if (!bag) throw new Error('Not found');
  bag = formatBag(bag);
  return bag;
};

export const getBagsInWallet = async (address: string): Promise<Bag[]> => {
  let { wallet } = await graphRequest(
    gql`
      query BagsInWallet($address: String!) {
        wallet(id: $address) {
          bags {
            id
            chest
            foot
            hand
            head
            neck
            ring
            waist
            weapon
            minted
          }
        }
      }
    `,
    { address }
  );
  wallet.bags = wallet.bags.map(formatBag);
  return wallet.bags;
};

export const getRecentTransfersForBag = async (
  id: number
): Promise<Transfer[]> => {
  let { transfers } = await graphRequest(
    gql`
      query RecentTransfersForBag($id: ID!) {
        transfers(
          where: { bag: $id }
          orderBy: timestamp
          orderDirection: desc
          first: 10
        ) {
          from {
            address
          }
          to {
            address
          }
          bag {
            id
          }
          timestamp
        }
      }
    `,
    { id }
  );
  transfers = transfers.map((transfer: any) => {
    transfer.bag.id = parseInt(transfer.bag.id);
    transfer.timestamp = new Date(transfer.timestamp * 1000);
    return transfer;
  });
  return transfers;
};

const formatBag = (bag: any): Bag => {
  bag.id = parseInt(bag.id);
  bag.rarityRank = (Rarity as Record<number, number>)[bag.id - 1];
  if (bag.minted) bag.minted = new Date(bag.minted * 1000);
  return bag;
};
