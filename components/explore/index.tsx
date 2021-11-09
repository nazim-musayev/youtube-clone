import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { useDrawerState } from 'context/Drawer';
import { VideoCard } from 'interfaces';
import VideoCardTwo from 'components/VideoCardTwo';


interface Card {
  src: string,
  label: string
};

interface Props {
  videos: VideoCard[]
};

const Explore: React.FC<Props> = ({videos}) => {
  const { open } = useDrawerState();

  const cards: Card[] = [
    {
      src: 'trending',
      label: 'Trending'
    },
    {
      src: 'music',
      label: 'Music'
    },
    {
      src: 'live',
      label: 'Live'
    },
    {
      src: 'gaming',
      label: 'Gaming'
    },
    {
      src: 'news',
      label: 'News'
    },
    {
      src: 'sports',
      label: 'Sport'
    },
    {
      src: 'learning',
      label: 'Learning'
    },
    {
      src: 'fashion_and_beauty',
      label: 'Fashion & beauty'
    }
  ];

  return (
    <Stack width='100%' height='auto' pl={open ? 33 : 23} pt={1.5}>
      <Stack direction='row' flexWrap='wrap'>
        {cards.map(({src, label}) => (
          <Stack bgcolor='secondary.main' width={210} height={110} pr={2}
            borderRadius={2} p={2} spacing={2} key={label} mb='4px' mr='4px'
            sx={{
               '&:hover': {
                 backgroundColor: 'black'
               }
            }}
          >
            <Stack width={32} height={32} position='relative'>
              <Image src={`https://youtube.com/img/explore/destinations/icons/${src}_color_32.png`} 
               alt='Trending' layout='fill' objectFit='cover' 
              />
            </Stack>
            <Typography fontWeight={600}>
              {label}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Stack width={open ? '77%' : '73%'}>
        <Typography fontWeight={600} mt={4} mb={3}>
          Trending Videos
        </Typography>
        <VideoCardTwo route='explore' videos={videos} width={240} height={130} />
      </Stack>
    </Stack>
  )
}

export default Explore;
