import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { addTag, selectSearchState, setTags } from 'store/search/searchSlice';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { useAppDispatch, useAppSelector } from 'store';
import TagIcon from '@mui/icons-material/Tag';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Autocomplete, Box, CircularProgress } from '@mui/material';
import { useGetTagsQuery } from 'store/tag/tagService';
import _ from 'lodash';

interface TransferListType {
  onClose: () => void;
  onSearch:(event: React.SyntheticEvent) => void;
}

export default function TransferList({ onClose, onSearch } : TransferListType) {
  const searchState = useAppSelector(selectSearchState);
  const dispatch = useAppDispatch();
  const { data: allTagData, isLoading: isLoadingAllTags } = useGetTagsQuery({});
  const { tags: selectedTags } = useAppSelector(selectSearchState);

  return (
    <>
      {/* Title */}
      <DialogTitle>
        <Typography variant="h4" component="h2">標籤管理</Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          {/* Search Tag */}
          <Autocomplete
            multiple
            value={selectedTags}
            loading={isLoadingAllTags}
            options={allTagData ? _.sortBy(allTagData, ['type']) : []}
            groupBy={(option) => option.type}
            getOptionLabel={(option) => option.text}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            sx={{ pt: 1 }}
            renderOption={(props, option) => (
              <Box component="li" {...props} onClick={() => dispatch(addTag(option))}>
                <Checkbox
                  icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                  checkedIcon={<CheckBoxIcon />}
                  checked={!!(selectedTags.find((t) => t.id === option.id))}
                />
                {option.text}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label="搜尋標籤"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {isLoadingAllTags ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderGroup={(params) => (
              <Box component="li" key={params.key}>
                {params.group === 'area' ? ' 領域' : null}
                {params.group === 'location' ? ' 地區' : null}
                {params.children}
              </Box>
            )}
            renderTags={(tagValue, getTagProps) => tagValue.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                label={option.text}
                onDelete={() => dispatch(addTag(option))}
                key={`tag-manage-option-${option.id}`}
              />
            ))}
            onChange={(e, value) => dispatch(setTags(value))}
            disableCloseOnSelect
          />

          {/* Recommend tag */}
          <Typography variant="h5" component="h3">推薦標籤</Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {searchState.recommendTags.map((tag) => (
              <Chip
                key={tag.id}
                label={tag.text}
                icon={<TagIcon />}
                deleteIcon={<AddCircleIcon />}
                onDelete={() => dispatch(addTag(tag))}
              />
            ))}
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={(event) => {
            onClose();
            onSearch(event);
          }}
          variant="contained"
        >
          搜尋

        </Button>
        <Button onClick={onClose}>關閉</Button>
      </DialogActions>
    </>
  );
}
