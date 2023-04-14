import React from 'react';
import Loading from 'components/Loading';
import { useGetActivityQuery } from 'store/activity/activityService';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import ImageSlide from 'components/ImageSlide';
import { ActivityTagDataType } from 'types/data';
import TagIcon from '@mui/icons-material/Tag';
import { Buffer } from 'buffer';
import {
  FcGraduationCap, FcList, FcPhone, FcReading, FcShare,
} from 'react-icons/fc';
import Stack from '@mui/material/Stack';
import {
  Box,
  Chip, Container, Divider, Grid, Link, Typography,
} from '@mui/material';
import { activityTypeToColor } from 'utils/activityTypeToColor';
import BranchTabs from './BranchTabs';

function Detail() {
  const { id = '1' } = useParams();
  const { data, isFetching, isError } = useGetActivityQuery(id as string);

  if (isFetching) {
    return <Loading />;
  }

  if (isError || !data) {
    toast.error('載入發生錯誤');
    return <div className="error" />;
  }

  const {
    images,
    title,
    subTitle,
    tags,
    objective,
    connection,
    sources,
    content,
    holder,
    branches,
  } = data;

  return (
    <Container maxWidth="xl">
      {/* Introduction */}
      <Grid container>

        <Grid item xs={12} md={6}>
          <Stack direction="column" spacing={2} alignItems="center">
            {/* Image */}
            <ImageSlide
              images={images}
              altText={title}
            />

            {/* Title */}
            <Typography variant="h4" component="h1">{title}</Typography>

            {/* SubTitle */}
            {subTitle && (
              <Typography variant="h5" component="h2">{subTitle}</Typography>
            )}

            {/* Tags */}
            {tags && (
              <Stack flexWrap="wrap" spacing={3} direction="row">
                {tags.map((tag: ActivityTagDataType) => (
                  <Chip label={tag.text} color={activityTypeToColor(tag.type)} icon={<TagIcon />} variant="outlined" />
                )).slice(0, 5)}
                {/* Add Tag Button */}
                <Chip
                  clickable
                  label=" + 新增標籤"
                />
              </Stack>
            )}
          </Stack>

        </Grid>

        <Grid xs={12} md={6}>
          <BranchTabs branches={branches} />
        </Grid>

      </Grid>

      {/* main content */}
      <Stack direction="column" spacing={2} sx={{ mt: 2 }}>

        {/* Object */}
        {objective
          && (
            <Box component="section">
              <Typography variant="h5" component="h3">
                <FcReading />
                活動對象
              </Typography>
              <Divider />
              <Typography variant="body1" component="p" />
            </Box>
          ) }

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
            dangerouslySetInnerHTML={{ __html: Buffer.from(content, 'base64').toString('utf-8') }}
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
              {sources.map((source: string, index: number) => (
                <Link
                  href={source}
                  target="_blank"
                  rel="noreferrer"
                  key={`detail-source-${index}`}
                >
                  {source}
                </Link>
              ))}
            </Stack>
          </Box>
        )}

        {/* Connection */}
        {connection && connection.length !== 0 && (
          <Box component="section">
            <Typography variant="h5" component="h3">
              <FcPhone />
              聯絡資訊
            </Typography>
            <Divider />
            <Stack direction="column">
              {connection.map((item: string, index: number) => (
                <Typography variant="body1" key={`detail-connection-${index}`}>
                  {item}
                </Typography>
              ))}
            </Stack>
          </Box>
        )}

        {/* Holder */}
        {holder && holder.length !== 0 && (
          <Box component="section">
            <Typography variant="h5" component="h3">
              <FcGraduationCap />
              主辦單位
            </Typography>
            <Divider />
            {holder.map((item: string, index:number) => (
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
