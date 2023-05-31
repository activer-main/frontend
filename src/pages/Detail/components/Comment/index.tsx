import React from 'react';
import { ActivityCommentRequestType, CommentSortbyUnion, orderByUnion } from 'types/request';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import CommentIcon from '@mui/icons-material/Comment';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useParams } from 'react-router-dom';
import { useGetActivityByIdQuery, useGetActivityCommentQuery } from 'store/activity/activityService';
import {
  Box, Button, Divider, Grid, MenuItem, Pagination, Select, Skeleton, Stack, Typography,
} from '@mui/material';
import CommentDialog from './CommentDialog';
import CommentItem from './CommentItem';

function Comment() {
  const { id = '1' } = useParams();
  const [open, setOpen] = React.useState(false);
  const { data } = useGetActivityByIdQuery(id as string);

  const [commentRequestStatus, setCommentRequestStatus] = React.useState<
  ActivityCommentRequestType>({
    activityId: id,
    orderBy: orderByUnion.DESC,
    sortBy: CommentSortbyUnion.ModifiedAt,
    page: 1,
    countPerPage: 10,
  });
  const {
    data: commentData,
    isLoading: isLoadingComment,
  } = useGetActivityCommentQuery(commentRequestStatus);

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Box component="section">
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" component="h3" sx={{ display: 'flex', alignItems: 'center' }}>
          <CommentIcon />
          評論
        </Typography>
        <Stack spacing={1} direction="row">

          {/* Dialog */}
          <Button
            startIcon={<RateReviewIcon />}
            onClick={handleOpenDialog}
            color="secondary"
          >
            撰寫評論
          </Button>

          <CommentDialog
            title={data ? data.title : ''}
            open={open}
            onClose={handleCloseDialog}
          />
          <Select
            sx={{ ml: 1 }}
            variant="standard"
            size="small"
            value={commentRequestStatus.sortBy}
            onChange={(event) => setCommentRequestStatus({
              ...commentRequestStatus,
              sortBy: event.target.value as CommentSortbyUnion,
            })}
          >
            <MenuItem value={CommentSortbyUnion.ADDTIME}>
              加入時間
            </MenuItem>
            <MenuItem value={CommentSortbyUnion.ModifiedAt}>
              修改時間
            </MenuItem>
          </Select>
          <Button
            startIcon={
              commentRequestStatus.orderBy === orderByUnion.DESC
                ? <KeyboardDoubleArrowDownIcon />
                : <KeyboardDoubleArrowUpIcon />
            }
            onClick={() => {
              setCommentRequestStatus({
                ...commentRequestStatus,
                orderBy: commentRequestStatus.orderBy === orderByUnion.DESC
                  ? orderByUnion.ASC
                  : orderByUnion.DESC,
              });
            }}
          >
            排序
          </Button>
        </Stack>
      </Stack>
      <Divider sx={{ mb: 1, mt: 0.5 }} />
      <Stack spacing={3}>
        {isLoadingComment && (
          <Skeleton width="100%" height={20} />
        )}

        {(!isLoadingComment && commentData && commentData.searchData.length > 0)
          ? (
            <>
              {commentData.searchData.map((prop) => (
                <CommentItem
                  key={prop.id}
                  onOpen={handleOpenDialog}
                  {...prop}
                />
              ))}
              {/* Comment Pagination */}
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignContent="center"
                marginTop={1}
              >
                <Pagination
                  count={commentData.totalPage}
                  onChange={(event, number) => {
                    setCommentRequestStatus({
                      ...commentRequestStatus,
                      page: number,
                    });
                  }}

                />
              </Grid>

            </>
          ) : <Typography>暫無評論</Typography>}

      </Stack>
    </Box>
  );
}

export default Comment;
