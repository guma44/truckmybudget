import { createSelector } from '@reduxjs/toolkit';


export const applicationStateSelector = (state) => (
  state.application
);

export const applicationUserSelector = createSelector(
  applicationStateSelector,
  ({ user }) => user
);

export const applicationStatusSelector = createSelector(
  applicationStateSelector,
  ({ status }) => status
);

export const expensesStatusSelector = createSelector(
  applicationStateSelector,
  ({ expensesStatus }) => expensesStatus
);

export const expensesSelector = createSelector(
  applicationStateSelector,
  ({ expenses }) => expenses
);