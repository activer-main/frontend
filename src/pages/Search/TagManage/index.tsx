import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { addTag, removeTag, selectSearchState } from 'store/search/searchSlice';
import Chip from '@mui/material/Chip';
import { useAppDispatch, useAppSelector } from 'store';
import TagIcon from '@mui/icons-material/Tag';
import ClearIcon from '@mui/icons-material/Clear';
import { activityTypeToColor } from 'utils/activityTypeToColor';
import AddIcon from '@mui/icons-material/Add';

interface TransferListType {
  onClose: () => void;
}

export default function TransferList({ onClose } : TransferListType) {
  const searchState = useAppSelector(selectSearchState);
  const dispatch = useAppDispatch();

  return (
    <>
      {/* Title */}
      <DialogTitle>
        <Typography variant="h4" component="h2">標籤管理</Typography>
      </DialogTitle>

      <DialogContent>
        <Stack spacing={3}>
          {/* Search Tag */}
          <TextField
            size="small"
            label="搜尋標籤"
            sx={{ mt: 1 }}
          />

          {/* Current tag */}
          <Typography variant="h5" component="h3">目前標籤</Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {searchState.tags.map((tag) => (
              <Chip
                label={tag.text}
                icon={<TagIcon />}
                deleteIcon={<ClearIcon />}
                onDelete={() => dispatch(removeTag(tag))}
                color={activityTypeToColor(tag.type)}
                variant="outlined"
              />
            ))}

          </Stack>

          {/* Recommend tag */}
          <Typography variant="h5" component="h3">推薦標籤</Typography>
          <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
            {searchState.recommendTags.map((tag) => (
              <Chip
                label={tag.text}
                icon={<TagIcon />}
                deleteIcon={<AddIcon />}
                onDelete={() => dispatch(addTag(tag))}
                color={activityTypeToColor(tag.type)}
                variant="outlined"
              />
            ))}
          </Stack>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="contained">搜尋</Button>
        <Button onClick={onClose}>關閉</Button>
      </DialogActions>
    </>
  );
}
