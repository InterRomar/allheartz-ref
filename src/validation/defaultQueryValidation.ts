import * as yup from 'yup';

export type DefaultQueryType = {
  page?: string;
  perPage?: string;
  sortBy?: string;
  sortDirection?: 'straight' | 'reverse';
}

export const defaultQueryValidation = {
  query: {
    page: yup.string().matches(/^[0-9]*$/),
    perPage: yup.string().matches(/^[0-9]*$/),
    sortBy: yup.string(),
    sortDirection: yup.string().oneOf(['straight', 'reverse']),
  },
};

export default defaultQueryValidation;
