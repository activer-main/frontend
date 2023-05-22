import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { TagDataType } from 'types/data';
import _, { cloneDeep, remove } from 'lodash';
import { searchApi } from './searchService';

interface SearchStateType {
  keyword: string;
  location: TagDataType[];
  date: string;
  area: TagDataType[];
  tags: TagDataType[];
  recommendTags: TagDataType[];
}

const initialState: SearchStateType = {
  keyword: '',
  location: [],
  date: '2000-01-01',
  area: [],
  tags: [],
  recommendTags: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setState: (state, action: PayloadAction<SearchStateType>) => action.payload,
    setValue: (state, action: PayloadAction<{
      key: keyof SearchStateType;
      value: any
    }>) => {
      const { key, value } = action.payload;
      return {
        ...state,
        [key]: value,
      };
    },
    setLocation: (state, action: PayloadAction<TagDataType>) => {
      if (_.some(state.location, action.payload)) {
        return {
          ...state,
          tags: _.reject(state.tags, action.payload),
          location: _.reject(state.location, action.payload),
        };
      }
      return {
        ...state,
        location: [...state.location, action.payload],
        tags: [...state.tags, action.payload],
      };
    },
    setArea: (state, action: PayloadAction<TagDataType>) => {
      if (_.some(state.area, action.payload)) {
        return {
          ...state,
          tags: _.reject(state.tags, action.payload),
          area: _.reject(state.area, action.payload),
        };
      }
      return {
        ...state,
        area: [...state.area, action.payload],
        tags: [...state.tags, action.payload],
      };
    },
    removeAllByType: (state, action: PayloadAction<TagDataType['type']>) => ({
      ...state,
      [action.payload]: [],
      tags: _.reject(state.tags, { type: action.payload }),
    }),
    addTag: (state, action: PayloadAction<TagDataType>) => {
      const newTag = action.payload;
      const newState = cloneDeep(state);
      const isTagExist = newState.tags.find((tag) => tag.text === newTag.text);

      if (!isTagExist) {
        newState.tags.push(newTag);
        remove(newState.recommendTags, (tag) => tag.id === newTag.id);

        if (newTag.type === 'area') {
          newState.area.push(newTag);
        }

        if (newTag.type === 'location') {
          newState.location.push(newTag);
        }

        return newState;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        searchApi.endpoints.getSearchActivity.matchFulfilled,
        (state, { payload }) => {
          const newState: SearchStateType = {
            keyword: payload.keyword || '',
            date: payload.date || '',
            tags: payload.tags || [],
            location: [],
            area: [],
            recommendTags: [],
          };

          _.forEach(payload.tags, (tag: TagDataType) => {
            if (tag.type === 'area') {
              newState.area.push(tag);
            }

            if (tag.type === 'location') {
              newState.location.push(tag);
            }
          });

          return newState;
        },
      );
  },
});

export const {
  setState, setValue, setLocation, setArea, addTag, removeAllByType,
} = searchSlice.actions;
export const selectSearchState = (state: RootState) => state.search;
export default searchSlice.reducer;
