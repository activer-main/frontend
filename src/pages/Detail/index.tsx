import React from 'react';
import { useParams } from 'react-router-dom';
import ImageSlide from 'components/ImageSlide';
import { ActivityTagDataType, statusUnion } from 'types/data';
import TagIcon from '@mui/icons-material/Tag';
import { Buffer } from 'buffer';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import {
  FcGraduationCap, FcList, FcShare,
} from 'react-icons/fc';
import Stack from '@mui/material/Stack';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import {
  Box,
  Checkbox,
  Chip, CircularProgress,
  Container,
  Divider, Grid, Link, List,
  ListItem, ListItemIcon, ListItemText,
  ListSubheader, Skeleton, Tooltip, Typography,
} from '@mui/material';
import { activityTypeToColor } from 'utils/activityTypeToColor';
import {
  useDeleteManageActivityMutation,
  useGetActivityByIdQuery,
  usePostActivityStatusMutation,
} from 'store/activity/activityService';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import BranchTabs from './BranchTabs';

function Detail() {
  const { id = '1' } = useParams();
  const { data, isLoading } = useGetActivityByIdQuery(id as string);
  const [updateStatus, { isLoading: isUpdating }] = usePostActivityStatusMutation();
  const [deleteStatus, { isLoading: isDeleting }] = useDeleteManageActivityMutation();

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
    if (data?.status === statusUnion.DREAM && activityId) {
      deleteStatus([activityId]);
    } else if (data?.status === null && activityId) {
      updateStatus({ id: activityId, status: '願望' as statusUnion });
    }
  };

  return (
    <Container maxWidth="xl">
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
                    checked={status === '願望'}
                    onClick={handleClickStatus}
                    size="small"
                    color="warning"
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
          <BranchTabs branches={branches} />
          <Divider />
          <List sx={{ p: 2 }}>
            {/* objective */}
            <ListItem>
              <ListItemIcon>
                <PersonAddAlt1Icon />
              </ListItemIcon>
              <ListItemText>
                活動對象
              </ListItemText>
              {(objectives && objectives.length > 0)
                ? (
                  <ListSubheader>{objectives.map((o) => o)}</ListSubheader>
                ) : <ListSubheader>請查看下方活動內容</ListSubheader>}
            </ListItem>
            {/* connection */}
            <ListItem>
              <ListItemIcon>
                <LocalPhoneIcon />
              </ListItemIcon>
              <ListItemText>
                聯絡資訊
              </ListItemText>
              {(connections && connections.length > 0)
                ? (
                  <ListSubheader>{connections.map((o) => o)}</ListSubheader>
                ) : <ListSubheader>請查看下方活動內容</ListSubheader>}
            </ListItem>
          </List>
        </Grid>

      </Grid>

      {/* main content */}
      <Stack direction="column" spacing={2} sx={{ mt: 2 }}>

        {/* Object */}

        {/* Content */}
        <Box component="section">
          <Typography variant="h5" component="h3">
            <FcList />
            活動內容
          </Typography>
          <Divider />
          <Typography
            variant="body1"
            component="p"
            dangerouslySetInnerHTML={{ __html: Buffer.from(html || '', 'base64').toString('utf-8') }}
          />
        </Box>

        {/* Sources */}
        {sources && sources.length !== 0 && (
          <Box component="section">
            <Typography variant="h5" component="h3">
              <FcShare />
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
            <Typography variant="h5" component="h3">
              <FcGraduationCap />
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
    </Container>
  );
}

export default Detail;
