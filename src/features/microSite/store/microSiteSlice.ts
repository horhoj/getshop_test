import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'microSite';

interface IS {
  test: boolean;
}

const initialState: IS = {
  test: true,
};

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {},
});

export const microSiteSlice = { actions, reducer } as const;
