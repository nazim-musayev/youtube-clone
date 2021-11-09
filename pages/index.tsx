import type { NextPage } from 'next';
import Stack from '@mui/material/Stack';
import Meta from 'components/Meta';
import SubBar from 'components/home/SubBar';
import VideoCard from 'components/VideoCardOne';
import Skeleton from 'components/Skeleton';
import { useDrawerState } from 'context/Drawer';
import { useVideosFromAll } from 'context/VideosFromAll';
import { useVideosFromCategoriesState } from 'context/VideosFromCategories';


const Home: NextPage = () => {
  const { videosFromCategories, selectedChip, isFetching } = useVideosFromCategoriesState();
  const { videos, loading } = useVideosFromAll();
  const { open } = useDrawerState();

  return (
    <Stack pl={open ? '240px': '72px'}>
      <Meta />
      <Stack 
       sx={{
        filter: `opacity(${isFetching ? '25%' : '100%'})`,
        pointerEvents: `${isFetching ? 'none' : 'auto'}`
       }}
      >
        <SubBar />
        {loading ? <Skeleton /> : (
          <Stack p={2}>
            <VideoCard route='home' 
             videos={selectedChip === 0 ? videos : videosFromCategories}
            />
          </Stack>
        )}
      </Stack>
    </Stack>
  )
};

export default Home;
