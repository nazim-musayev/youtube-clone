import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Svg from 'components/Svg';
import { useDrawerState } from 'context/Drawer';
import { VideoCard } from 'interfaces';
import VideoCardTwo from 'components/VideoCardTwo';

interface Props {
  videos: VideoCard[]
};

const SearchedVideos: React.FC<Props> = ({videos}) => {
  const filter: string ='M15,17h6v1h-6V17z M11,17H3v1h8v2h1v-2v-1v-2h-1V17z M14,8h1V6V5V3h-1v2H3v1h11V8z M18,5v1h3V5H18z M6,14h1v-2v-1V9H6v2H3v1 h3V14z M10,12h11v-1H10V12z';
  const { open } = useDrawerState();
 
  return (
    <Stack py={2} pl={open ? 33 : 20} pr={open ? 4 : 13}>
      <Stack borderBottom={1} borderColor='grey.800' mb={2}>
        <Tooltip title='Open search filters'>
          <Button startIcon={<Svg d={filter} />} size='large'
           sx={{
            color: 'lightgray',
            width: '90px',
            '&:hover': {
              backgroundColor: '#161616'
            }
           }} 
          >
            Filters
          </Button>
        </Tooltip>
      </Stack>
      <VideoCardTwo route='search' videos={videos} width={360} height={200} />
    </Stack>
  )
};

export default SearchedVideos;

