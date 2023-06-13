import {
  Avatar, Box, Paper, IconButton, Rating, Stack, Typography,
  CircularProgress,
} from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import React from 'react';
import { CommentDataType } from 'types/data';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { useAppSelector } from 'store';
import { selectUserInfo } from 'store/user/userSlice';
import { format, parseISO } from 'date-fns';
import { useDeleteActivityCommentMutation } from 'store/activity/endpoints/comment';

interface CommentItemType extends CommentDataType {
  onOpen: () => void
}

function CommentItem({
  username, content, userAvatar, rate, id, userId, modifiedAt, onOpen,
}: CommentItemType) {
  const [deleteComment, { isLoading: isDeleting }] = useDeleteActivityCommentMutation();
  const userInfo = useAppSelector(selectUserInfo);
  const confirm = useConfirm();

  const handleDelete = () => {
    confirm({ title: '確定刪除此留言?' })
      .then(() => {
        deleteComment(id)
          .unwrap()
          .then(() => toast.success('成功刪除留言'))
          .catch((err: any) => toast.error(err.data.message));
      });
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
        <Avatar src={userAvatar} />
        <Stack sx={{ flexGrow: 1 }}>
          <Typography variant="body1">{username}</Typography>
          <Typography variant="caption">
            上次編輯時間:
            {' '}
            {format(parseISO(modifiedAt), 'yyyy/MM/dd')}
          </Typography>
        </Stack>
        {(userInfo && userInfo.id === userId)
        && (
          <>
            <IconButton onClick={onOpen}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleDelete}>
              {isDeleting
                ? <CircularProgress size="1em" />
                : <DeleteOutlineIcon />}
            </IconButton>
          </>
        )}
      </Box>
      <Rating
        name="simple-controlled"
        value={rate}
        readOnly
      />
      <Typography variant="body2">
        {content}
      </Typography>

    </Paper>
  );
}

export default CommentItem;
