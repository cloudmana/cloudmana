export interface ListNotificationFilter {
  sortBy?: string;
  sortType?: string;
  page?: number;
  size?: number;
}
export interface ListNotificationResponse {
  items: Array<NotificationItem>;
}

export interface NotificationItem {
  _id: string;
  walletAddress: string;
  type: string;
  isRead: boolean;
  data?: NotiItemData[];
  dataModel?: string;
}

export interface NotiItemData {
  _id: string;
  buyerAddress: string;
  nftItemId: string;
  collectionId: string;
  networkId: number;
  amount: number;
  price: number;
  currency: string;
  signature: string;
  salt: number;
  startTime: number;
  endTime: number;
  status: string;
}

export enum NOTIFICATION_TYPE {
  OFFER = 'offers',
  LISTING = 'listings',
}

export interface IReadNotification {
  _id: string;
}
