import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TagIcon from '@mui/icons-material/Tag';
import SendIcon from '@mui/icons-material/Send';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ActivityDataType, TagDataType, statusUnion } from 'types/data';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { activityTypeToColor } from 'utils/activityTypeToColor';
import { CardActionArea, CircularProgress, Skeleton } from '@mui/material';
import { usePostActivityStatusMutation } from 'store/activity/endpoints/postActivityStatus';
import { useDeleteManageActivityMutation } from 'store/activity/endpoints/deleteManageActivities';
import { useAppSelector } from 'store';
import { selectUserInfo } from 'store/user/userSlice';

export interface CardType {
  id: string;
  imgUrl: string,
  title: string | null,
  altText: string,
  tags?: TagDataType[],
  detail?: React.ReactNode;
  control? : React.ReactNode;
}
export default function ActionCard({
  imgUrl, title, tags, altText, detail, control, id,
}: CardType) {
  const [imageSrc, setImageSrc] = React.useState(imgUrl);
  const navigate = useNavigate();

  const handleImageError = () => {
    setImageSrc('/DefaultActivityImage.svg');
  };

  const handleLoad = () => (<Skeleton sx={{ height: '40%' }} />);

  return (
    <Card
      sx={{
        height: '490px',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          '& .card-img': {
            scale: '1.1',
          },
        },
      }}
    >
      {/* Card image */}
      <CardActionArea onClick={() => navigate(`/detail/${id}`)}>
        <CardMedia
          className="card-img"
          onLoad={handleLoad}
          component="img"
          sx={{
            height: '200px',
            transition: 'all 0.3s ease-in-out',
            mt: 0,
          }}
          onError={handleImageError}
          image={imageSrc}
          alt={altText}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
            }}
          >
            {title || `Activity#${id.slice(0, 5)}...`}
          </Typography>

          <Typography
            variant="caption"
            color="primary.light"
            gutterBottom
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 5,
            }}
          >
            {detail}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{
        flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', mb: 0, flexGrow: 1,
      }}
      >
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          sx={{ mb: 1 }}
          direction="row"
        >
          {tags?.slice(0, 3).map((tag) => (
            <Chip
              key={tag.id}
              icon={<TagIcon />}
              label={tag.text}
              size="small"
              color={activityTypeToColor(tag.type)}
              variant="outlined"
              onClick={() => navigate(`/search?tags=${tag.text}`)}
            />
          ))}
        </Stack>
        {control}
      </CardActions>

    </Card>
  );
}

export function MainCard({ ...props }: ActivityDataType) {
  const {
    title, tags, images, trend, id, content, status,
  } = props;
  const userInfo = useAppSelector(selectUserInfo);
  const navigate = useNavigate();
  const [updateStatus, { isLoading: isUpdating }] = usePostActivityStatusMutation();
  const [deleteStatus, { isLoading: isDeleting }] = useDeleteManageActivityMutation();

  const handleClickStatus = () => {
    if (!userInfo) {
      navigate('/login');
    }

    if (status === statusUnion.DREAM) {
      deleteStatus([id]);
    } else if (status === null) {
      updateStatus({ id, status: '願望' as statusUnion });
    }
  };

  return (
    <ActionCard
      id={id.toString()}
      title={title}
      tags={tags?.map((tag) => ({ text: tag.text, id: tag.id, type: tag.type }))}
      imgUrl={images ? images[0] : '/DefaultActivityImage.svg'}
      detail={content}
      altText={title || 'activity-image'}
      control={(
        <Grid container sx={{ alignItems: 'center' }}>
          <Grid item xs>
            <Typography>
              &#128065;
              {' '}
              {trend}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton aria-label="navigate" onClick={() => navigate(`/detail/${id}`)}>
              <SendIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <Checkbox
              icon={isUpdating ? <CircularProgress size="1em" /> : <FavoriteBorderIcon />}
              checkedIcon={isDeleting ? <CircularProgress size="1em" /> : <FavoriteIcon />}
              size="small"
              color="warning"
              checked={status === '願望'}
              onClick={handleClickStatus}
            />
          </Grid>
        </Grid>
      )}
    />
  );
}
