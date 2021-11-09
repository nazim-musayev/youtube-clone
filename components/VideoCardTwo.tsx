import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LightTooltip from 'components/LightTooltip';
import ChannelTitle from 'components/ChannelTitle';
import Duration from 'components/Duration';
import Avatar from 'components/Avatar';
import Svg from 'components/Svg';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { VideoCard } from 'interfaces';
import Moment from 'react-moment';


interface Props {
  videos: VideoCard[],
  width: number,
  height: number,
  route: string
};

const Explore: React.FC<Props> = ({videos, width, height, route}) => {
  const threeDot: string = 'M12,16.5c0.83,0,1.5,0.67,1.5,1.5s-0.67,1.5-1.5,1.5s-1.5-0.67-1.5-1.5S11.17,16.5,12,16.5z M10.5,12 c0,0.83,0.67,1.5,1.5,1.5s1.5-0.67,1.5-1.5s-0.67-1.5-1.5-1.5S10.5,11.17,10.5,12z M10.5,6c0,0.83,0.67,1.5,1.5,1.5 s1.5-0.67,1.5-1.5S12.83,4.5,12,4.5S10.5,5.17,10.5,6z';
  const watchLater: string = 'M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z';
  const queue: string = 'M21,16h-7v-1h7V16z M21,11H9v1h12V11z M21,7H3v1h18V7z M10,15l-7-4v8L10,15z';  
  const [hover, setHover] = useState<string | null>(null);

  return (
    <>
      {videos.map(({publishedAt, title, duration, description, channelTitle, channelId, videoId, viewCount, thumbnail, avatarUrl}) => (
        <Link href={`/watch/${videoId}`} key={videoId} passHref>
          <Stack direction='row' spacing={2} mb={2} position='relative' sx={{cursor: 'pointer'}}
           onMouseEnter={() => setHover(channelId)} 
           onMouseLeave={() => setHover(null)}
          >
            <Stack position='relative'>
              <Stack position='relative' width={width} height={height}>
                <Image src={thumbnail} alt='Thumbnail' objectFit='cover' layout='fill' priority/>
              </Stack>
              {hover === channelId && (
                <>
                  <Stack position='absolute' bgcolor='secondary.main' right={5} top={5}>
                    <Svg d={watchLater}/>
                  </Stack>
                  <Stack position='absolute' bgcolor='secondary.main' right={5} top={35}>
                    <Svg d={queue}/>
                  </Stack>
                </>
              )}
              {hover !== channelId && (
                <Stack position='absolute' bgcolor='black' right={5} bottom={5}>
                  <Typography variant='caption' px='4px'>
                    {duration!.length < 6 && `0:`}
                    <Duration duration={duration!} />
                  </Typography>
                </Stack>
              )}
            </Stack>
            <Stack>
              <LightTooltip title={title} placement='bottom-start'>
                <Typography fontSize='17px' fontWeight={600}>
                  {title}
                </Typography>
              </LightTooltip>
              <Stack direction='row'>
                {route === 'explore' && <ChannelTitle channelTitle={channelTitle} />}
                <Typography color='grey.500' variant='caption' mb={1}>
                  {`${viewCount!.slice(0, viewCount!.length > 6 ? 1 : 3)}${viewCount!.length > 6 ? `M` : 'K'} views  • `}
                  <Moment fromNow>
                    {publishedAt}
                  </Moment>
                </Typography>
              </Stack>
              {route === 'search' && (
                <Stack direction='row' spacing={1} my={1}>
                  <Avatar avatarUrl={avatarUrl!} width={24} height={24} />
                  <ChannelTitle channelTitle={channelTitle} />
                </Stack>
              )}
              <Typography color='grey.500' fontSize='12px' align='justify'>
                {description!.slice(0,150)}...
              </Typography>
            </Stack>
            {hover === channelId && (
              <Stack position='absolute' top={0} right={0}>
                <Svg d={threeDot} />
              </Stack>
            )}
          </Stack>
        </Link>
      ))}
    </>
  )
};

export default Explore;
