import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { VideoCard } from 'interfaces';
import ExplorePage from 'components/explore';
import Meta from 'components/Meta';

export const getServerSideProps: GetServerSideProps = async () => {
  const key = process.env.NEXT_PUBLIC_API_KEY;
  const res = await axios.get(`/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=AZ&key=${key}`);
  const data = res.data;
  const videos: VideoCard[] = [];
 
  data.items.map((item: any) => {
    videos.push({
      publishedAt: item.snippet.publishedAt,
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      viewCount: item.statistics.viewCount,
      duration: item.contentDetails.duration,
      thumbnail: item.snippet.thumbnails.maxres ? item.snippet.thumbnails.maxres.url : item.snippet.thumbnails.default.url,
      videoId: item.id
    })
  });

  return {
    props: { videos }
  }
};

interface Props {
  videos: VideoCard[]
};

const Explore: NextPage<Props> = ({videos}) => {
  return (
    <>
      <Meta title='Explore - YouTube' />
      <ExplorePage videos={videos} />
    </>
  )
};

export default Explore;
