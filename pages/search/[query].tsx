import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { VideoCard, VideoWithStatistics, VideoWithoutStatistics, ChannelData } from 'interfaces';
import SearchPage from 'components/search';
import Meta from 'components/Meta';

export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const { query } = params!;
  const key = process.env.NEXT_PUBLIC_API_KEY;
  const videosWithoutStatistics: VideoWithoutStatistics[] = [];
  const videosWithStatistics: VideoWithStatistics[] = [];
  const videoIds: string[] = [];
  const channelIds: string[] = [];
  const avatars: ChannelData[] = [];
  const finalData: VideoCard[] = [];

  const r = await axios.get(`/search?part=snippet&maxResults=25&q=${query}&regionCode=US&key=${key}`);
  const dataWithoutStatistics = r.data;

  if(dataWithoutStatistics) {
    dataWithoutStatistics.items.map((item: any) => {
      videosWithoutStatistics.push({
        publishedAt: item.snippet.publishedAt,
        channelId: item.snippet.channelId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.maxres ? item.snippet.thumbnails.maxres.url : item.snippet.thumbnails.high.url,
        channelTitle: item.snippet.channelTitle,
        description: item.snippet.description,
        videoId: item.id.videoId
      });
      videoIds.push(item.id.videoId)
      channelIds.push(item.snippet.channelId)
    })
  };

  const res = await axios.get(`/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoIds}&maxResults=25&regionCode=US&key=${key}`);
  const dataWithStatistics = res.data;

  if(dataWithStatistics){
    dataWithStatistics.items.map((item: any) => {
      videosWithStatistics.push({
        duration: item.contentDetails.duration,
        viewCount: item.statistics.viewCount,
        id: item.id
      })
    })
  };

  const response = await axios.get(`/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelIds}&maxResults=50&key=${key}`)
  const dataWithAvatars = response.data;

  if(dataWithAvatars){
    dataWithAvatars.items.map((item: any) => {
      avatars.push({
        avatarUrl: item.snippet.thumbnails.default.url,
        id: item.id
      })
    });
  };

  videosWithoutStatistics.map((item: VideoWithoutStatistics) => {
    videosWithStatistics.map((itemWithStatistics: VideoWithStatistics) => {
      if(item.videoId === itemWithStatistics.id){
        avatars.map((itemWithAvatar: ChannelData) => {
          if(item.channelId === itemWithAvatar.id){
            finalData.push({
              publishedAt: item.publishedAt,
              channelId: item.channelId,
              title: item.title,
              thumbnail: item.thumbnail,
              channelTitle: item.channelTitle,
              viewCount: itemWithStatistics.viewCount,
              duration: itemWithStatistics.duration,
              description: item.description,
              videoId: item.videoId,
              avatarUrl: itemWithAvatar.avatarUrl
            })
          }
        })
      }
    });
  });

  return {
    props: { videos: finalData, query }
  }
};

interface Props {
  videos: VideoCard[],
  query: string
};

const DynamicSearchPage: NextPage<Props> = ({videos, query}) => {
  return (
    <>
      <Meta title={`${query} - YouTube`} />
      <SearchPage videos={videos} />
    </>
  )
};

export default DynamicSearchPage;
