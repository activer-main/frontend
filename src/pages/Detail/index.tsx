import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ImageSlide from 'components/ImageSlide';
import { ActivityTagDataType, statusUnion } from 'types/data';
import TagIcon from '@mui/icons-material/Tag';
import { Buffer } from 'buffer';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Stack from '@mui/material/Stack';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RateReviewIcon from '@mui/icons-material/RateReview';
import {
  Box,
  Button,
  Checkbox,
  Chip, CircularProgress,
  Container,
  Divider, Grid, Link, List,
  ListItem, ListItemIcon, ListItemText,
  ListSubheader, MenuItem, Pagination,
  Select, Skeleton, Tooltip, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { activityTypeToColor } from 'utils/activityTypeToColor';
import {
  useDeleteManageActivityMutation,
  useGetActivityByIdQuery,
  useGetActivityCommentQuery,
  usePostActivityStatusMutation,
} from 'store/activity/activityService';
import HandshakeIcon from '@mui/icons-material/Handshake';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import DnsIcon from '@mui/icons-material/Dns';
import { ActivityCommentRequestType, CommentSortbyUnion, orderByUnion } from 'types/request';
import _ from 'lodash';
import BranchTabs from './components/BranchTabs';
import CommentItem from './components/CommentItem';
import CommentDialog from './components/CommentDialog';

function Detail() {
  const navigate = useNavigate();
  const { id = '1' } = useParams();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  const { data, isLoading } = useGetActivityByIdQuery(id as string);
  const [updateStatus, { isLoading: isUpdating }] = usePostActivityStatusMutation();
  const [deleteStatus, { isLoading: isDeleting }] = useDeleteManageActivityMutation();
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

  const {
    id: activityId,
    images,
    title,
    subTitle,
    tags,
    objectives,
    connections,
    sources,
    html,
    holders,
    status,
    branches,
  } = data || {};

  const handleClickStatus = () => {
    if (status === statusUnion.DREAM && activityId) {
      deleteStatus([activityId]);
    } else {
      updateStatus({ id: activityId!, status: '願望' as statusUnion });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ pb: 2 }}>
      {/* Introduction */}
      <Grid container sx={{ mt: 2 }}>

        <Grid item xs={12} md={6}>
          <Grid container spacing={2} direction="column">

            {/* Image */}
            <Grid item xs>
              {isLoading
                ? (
                  <Skeleton width="100%">
                    <ImageSlide
                      images={images}
                      altText={title || 'activity-image'}
                    />
                  </Skeleton>
                )
                : (
                  <ImageSlide
                    images={images}
                    altText={title || 'activity-image'}
                  />
                )}
            </Grid>

            {/* Title */}
            <Grid item xs>
              <Typography variant="h4" component="h1">{ isLoading ? <Skeleton width="100%" /> : title}</Typography>
            </Grid>

            {/* SubTitle */}

            {subTitle && (
              <Grid item xs>
                <Typography variant="h5" component="h2">{subTitle}</Typography>
              </Grid>
            )}

            {/* Tags */}
            <Grid item xs>
              {tags && (
                <Stack flexWrap="wrap" spacing={3} direction="row">
                  {tags.map((tag: ActivityTagDataType) => (
                    <Chip
                      key={`detail-tag-${tag.id}`}
                      label={tag.text}
                      color={activityTypeToColor(tag.type)}
                      icon={<TagIcon />}
                      variant="outlined"
                      onClick={() => navigate(`/search?tags=${tag.text}`)}
                    />
                  )).slice(0, 5)}
                </Stack>
              )}
            </Grid>

            {/* Control */}
            <Grid item xs>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Tooltip title={status === '願望' ? '從願望清單中移除' : '加入願望清單'}>
                  <Checkbox
                    icon={isUpdating ? <CircularProgress size="1em" /> : <FavoriteBorderIcon />}
                    checkedIcon={isDeleting ? <CircularProgress size="1em" /> : <FavoriteIcon />}
                    checked={!!status}
                    onClick={handleClickStatus}
                    size="small"
                    color="warning"
                    disabled={isDeleting}
                  />
                </Tooltip>
                <Chip
                  clickable
                  label="+ 新增標籤"
                />
              </Stack>
            </Grid>

          </Grid>

        </Grid>

        <Grid item xs={12} md={6} sx={{ p: 2 }}>
          {isLoading
           && (
             <Stack spacing={2} sx={{ p: 4, pl: 10 }}>
               {_.times(3, (index) => (
                 <Box
                   key={`detail-branch-skeleton-${index}`}
                   sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     gap: 20,
                   }}
                 >
                   <Skeleton sx={{ flexGrow: 1, height: '1.5em' }} />
                   <Skeleton sx={{ flexGrow: 3, height: '1.5em' }} />
                 </Box>
               ))}
             </Stack>
           )}
          <BranchTabs branches={branches} />
          <Divider />
          <List sx={{ p: isMobile ? 0 : 2 }}>
            {/* objective */}
            <ListItem>
              <ListItemIcon>
                <PersonAddAlt1Icon />
              </ListItemIcon>
              {isMobile ? null : (
                <ListItemText>
                  活動對象
                </ListItemText>
              )}
              {(objectives && objectives.length > 0)
                ? (
                  <ListSubheader>{objectives.map((o) => o)}</ListSubheader>
                ) : <ListSubheader>{isLoading ? <Skeleton /> : '請查看下方活動內容'}</ListSubheader>}
            </ListItem>
            {/* connection */}
            <ListItem>
              <ListItemIcon>
                <LocalPhoneIcon />
              </ListItemIcon>
              {isMobile ? null : (
                <ListItemText>
                  聯絡資訊
                </ListItemText>
              )}
              {(connections && connections.length > 0)
                ? (
                  <ListSubheader>{connections.map((o) => o)}</ListSubheader>
                ) : <ListSubheader>{isLoading ? <Skeleton /> : '請查看下方活動內容'}</ListSubheader>}
            </ListItem>
          </List>
        </Grid>

      </Grid>

      {/* main content */}
      <Stack direction="column" spacing={2} sx={{ mt: 2 }}>

        {/* Content */}
        <Box component="section">
          <Typography variant="h5" component="h3">
            <DnsIcon />
            活動內容
          </Typography>
          <Divider />
          {isLoading && <Skeleton height={200} />}
          <Typography
            variant="body1"
            dangerouslySetInnerHTML={{ __html: Buffer.from(html || '', 'base64').toString('utf-8') }}
          />
        </Box>

        {/* Sources */}
        {sources && sources.length !== 0 && (
          <Box component="section">
            <Typography variant="h5" component="h3" sx={{ display: 'flex', alignItems: 'center' }}>
              <OpenInNewIcon />
              原始來源
            </Typography>
            <Divider />
            <Stack direction="column" spacing={1} sx={{ padding: 1 }}>
              {sources.map((source: string, index) => (
                <Link
                  href={source}
                  target="_blank"
                  key={`source-${index}`}
                  rel="noreferrer"
                >
                  {source}
                </Link>
              ))}
            </Stack>
          </Box>
        )}

        {/* Holder */}
        {holders && holders.length !== 0 && (
          <Box component="section">
            <Typography variant="h5" component="h3" sx={{ display: 'flex', alignItems: 'center' }}>
              <HandshakeIcon />
              主辦單位
            </Typography>
            <Divider />
            {holders.map((item: string, index:number) => (
              <Typography variant="body1" key={`detail-holder-${index}`}>
                {item}
              </Typography>
            ))}
          </Box>
        )}

      </Stack>

      {/* Comment */}
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
              title={title || ''}
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
    </Container>
  );
}

export default Detail;
