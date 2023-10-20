import { configureStore } from '@reduxjs/toolkit';
import { microSiteSlice } from '~/features/microSite/store/microSiteSlice';

export const store = configureStore({
  devTools: true,
  reducer: {
    microSite: microSiteSlice.reducer,
  },
});
