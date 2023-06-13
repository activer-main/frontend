import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { TagDataType } from 'types/data';
import _, { cloneDeep, remove } from 'lodash';
import { format } from 'date-fns';
import { searchApi } from 'store/activity/endpoints/search';

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
  date: format(new Date(), 'yyyy-MM-dd'),
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
      if (state.location.find((t) => t.id === action.payload.id)) {
        return {
          ...state,
          tags: state.tags.filter((t) => t.id !== action.payload.id),
          location: state.location.filter((t) => t.id !== action.payload.id),
        };
      }
      return {
        ...state,
        location: [...state.location, action.payload],
        tags: [...state.tags, action.payload],
      };
    },
    setArea: (state, action: PayloadAction<TagDataType>) => {
      if (state.area.find((t) => t.id === action.payload.id)) {
        return {
          ...state,
          tags: state.tags.filter((t) => t.id !== action.payload.id),
          area: state.area.filter((t) => t.id !== action.payload.id),
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

      return (
        {
          ...state,
          tags: _.reject(state.tags, action.payload),
          location: _.reject(state.location, action.payload),
          area: _.reject(state.area, action.payload),
          recommendTags: [...state.recommendTags, action.payload],
        }
      );
    },
    setTags: (state, action: PayloadAction<TagDataType[] | null>) => {
      if (!action.payload) {
        return ({
          ...state,
          tags: [],
          location: [],
          area: [],
        });
      }

      const newState = cloneDeep(state);
      _.forEach(action.payload, (tag: TagDataType) => {
        if (tag.type === 'area') {
          newState.area.push(tag);
        }

        if (tag.type === 'location') {
          newState.location.push(tag);
        }
      });

      return ({
        ...newState,
        tags: action.payload,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        searchApi.endpoints.search.matchFulfilled,
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
  setState, setValue, setLocation, setArea, addTag, removeAllByType, setTags,
} = searchSlice.actions;
export const selectSearchState = (state: RootState) => state.search;
export default searchSlice.reducer;
