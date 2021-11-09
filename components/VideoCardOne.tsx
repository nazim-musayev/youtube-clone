import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Moment from 'react-moment';
import Svg from 'components/Svg';
import Duration from 'components/Duration';
import LightTooltip from 'components/LightTooltip';
import ChannelTitle from 'components/ChannelTitle';
import Avatar from 'components/Avatar';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { VideoCard } from 'interfaces';


interface Props {
  route: string,
  videos: VideoCard[]
};

const VideoCardOne: React.FC<Props> = ({route, videos}) => {
  const threeDot: string = 'M12,16.5c0.83,0,1.5,0.67,1.5,1.5s-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5S11.17,16.5,12,16.5z M10.5,12 c0,0.83,0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5s-0.67-1.5-1.5-1.5S10.5,11.17,10.5,12z M10.5,6c0,0.83,0.67,1.5,1.5,1.5 s1.5-0.67,1.5-1.5S12.83,4.5,12,4.5S10.5,5.17,10.5,6z';
  const watchLater: string = 'M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z';
  const queue: string = 'M21,16h-7v-1h7V16z M21,11H9v1h12V11z M21,7H3v1h18V7z M10,15l-7-4v8L10,15z';
  const [hover, setHover] = useState<number | null>(null);

  return (
    <Grid container mb={2} p='6px' spacing={1}>
      {videos.map(({publishedAt, title, duration, videoId, channelTitle, viewCount, thumbnail, avatarUrl}, index) => (
        <Link href={`/watch/${videoId}`} key={videoId} passHref>
          <Grid item container lg={route === 'home' ? 3 : 12} p={1}
           sx={{cursor: 'pointer'}} position='relative' spacing={1}
           mb={route === 'home' ? 3 : 0}
           onMouseEnter={() => setHover(index)} 
           onMouseLeave={() => setHover(null)}
          >
            <Grid item lg={route === 'home' ? 12 : 5}>
              <Stack position='relative' display='block'>
                <Image src={thumbnail!} alt='Thumbnail' height={100} width={170} layout='responsive'
                 priority placeholder='blur' blurDataURL={thumbnail} 
                />
                {hover === index && (
                  <>
                    <Stack position='absolute' bgcolor='secondary.main' right={5} top={5}>
                      <Svg d={watchLater}/>
                    </Stack>
                    <Stack position='absolute' bgcolor='secondary.main' right={5} top={35}>
                      <Svg d={queue}/>
                    </Stack>
                  </>
                )}
                {hover !== index && (
                  <Stack position='absolute' bgcolor='black' right={5} bottom={5}>
                    <Typography variant='caption' px='4px'>
                      {duration.length < 6 && `0:`}
                      <Duration duration={duration} />
                    </Typography>
                  </Stack>
                )}
              </Stack>
            </Grid>
            <Grid item lg={route === 'home' ? 12 : 7} position='relative' mt='6px'>
              <Stack direction='row' spacing={1} height='80px'>
                {route === 'home' && <Avatar avatarUrl={avatarUrl!} width={36} height={36} />}
                <Stack width={route === 'home' ? '75%' : '80%'}>
                  <LightTooltip title={title} placement='top-end'>
                    <Typography fontSize='13px' fontWeight={600} letterSpacing={0} mb='4px'>
                      {title.length > (route === 'home' ? 40 : 55) ? `${title.slice(0,route === 'home' ? 39 : 54)}...` : title}
                    </Typography>
                  </LightTooltip>
                  <ChannelTitle channelTitle={channelTitle} />
                  <Typography color='grey.500' variant='caption'>
                      {`${viewCount!.slice(0, viewCount!.length > 6 ? 1 : 3)}${viewCount!.length > 6 ? `M` : 'K'} views  • `}
                    <Moment fromNow>
                      {publishedAt}
                    </Moment>
                  </Typography>
                </Stack>
                {hover === index && (
                  <Stack position='absolute' top={10} right={0}>
                    <Svg d={threeDot} />
                  </Stack>
                )}
              </Stack>
            </Grid>
          </Grid>
        </Link>
      ))}
    </Grid>
  )
};

export default VideoCardOne;
