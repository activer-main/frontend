import {
  Avatar, Box, Paper, IconButton, Rating, Stack, Typography, CircularProgress,
} from '@mui/material';
import React from 'react';
import { CommentDataType } from 'types/data';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useDeleteActivityCommentMutation } from 'store/activity/activityService';
import { toast } from 'react-toastify';
import { useAppSelector } from 'store';
import { selectUserInfo } from 'store/user/userSlice';

function CommentItem({
  username, content, userAvatar, rate, id, userId,
}: CommentDataType) {
  const [deleteComment, { isLoading: isDeleting }] = useDeleteActivityCommentMutation();
  const userInfo = useAppSelector(selectUserInfo);

  const handleDelete = () => {
    deleteComment(id)
      .unwrap()
      .then(() => toast.success('成功刪除留言'))
      .catch((err: any) => toast.error(err.data.message));
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between' }}>
        <Avatar src={userAvatar} />
        <Stack sx={{ flexGrow: 1 }}>
          <Typography variant="body1">{username}</Typography>
          <Typography variant="caption">2023/5/29</Typography>
        </Stack>
        {(userInfo && userInfo.id === userId)
        && (
          <IconButton onClick={handleDelete}>
            {isDeleting
              ? <CircularProgress size="1em" />
              : <DeleteOutlineIcon />}
          </IconButton>
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
