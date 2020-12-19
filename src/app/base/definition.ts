import { cloneDeep } from 'lodash';

export const DefaultPageSize = 10;

export interface LabelOption {
  label?: string;
  value: any;
}

export interface PageQuery<T> {
  currentPage: number;
  pageSize: number;
  t?: T;
};

export interface LResponse<T> {
  totalPage: number;
  list: T[];
}

const DefaultQuery: PageQuery<any> = {
  currentPage: 1,
  pageSize: DefaultPageSize,
  t: {},
};

const AllDataQuery: PageQuery<any> = {
  currentPage: 1,
  pageSize: 10000,
};

export const getDetailQuery = <T>(t: T): PageQuery<T> => ({currentPage: 1, pageSize: 1, t});
export const getDefaultQuery = () => cloneDeep(DefaultQuery);
export const getAllDataQuery = () => cloneDeep(AllDataQuery);
