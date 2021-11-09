import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import VideoPage from 'components/watch';
import Meta from 'components/Meta';
import { SingleVideo, ChannelData, Comment, VideoCard, VideoWithoutStatistics, VideoWithStatistics } from 'interfaces';


export const getServerSideProps: GetServerSideProps = async ({params}) => {
  const { id } = params!;
  const key = process.env.NEXT_PUBLIC_API_KEY;
  let video: SingleVideo | null = null;
  let channelData: ChannelData | null = null;
  const relatedWithoutStats: VideoWithoutStatistics[] = [];
  const relatedWithStats: VideoWithStatistics[] = [];
  const relatedVideoIds: string[] = [];
  const relatedVideos: VideoCard[] = [];
  const comments: Comment[] = [];

  const r = await axios.get(`/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${key}`);
  const videoById = r.data;
 
  if(videoById) {
    const item = videoById.items[0];        
      video = {
        publishedAt: item.snippet.publishedAt,
        channelId: item.snippet.channelId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        viewCount: item.statistics.viewCount,
        description: item.snippet.description,
        videoId: item.id,
        likes: item.statistics.likeCount,
        dislikes: item.statistics.dislikeCount
      }
  };

  const res = await axios.get(`/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${videoById.items[0].snippet.channelId}&key=${key}`)
  const additionalDataToVideo = res.data;

  if(additionalDataToVideo){
    const item = additionalDataToVideo.items[0];
      channelData = {
        avatarUrl: item.snippet.thumbnails.default.url,
        subscribers: item.statistics.subscriberCount
      };
  };

  const resp = await axios.get(`/commentThreads?part=snippet%2Creplies&maxResults=25&order=time&textFormat=plainText&videoId=${videoById.items[0].id}&key=${key}`)
  const commentData = resp.data;

  if(commentData){
    commentData.items.map((item: any) => {
      comments.push({
        text: item.snippet.topLevelComment.snippet.textDisplay,
        name: item.snippet.topLevelComment.snippet.authorDisplayName,
        avatarUrl: item.snippet.topLevelComment.snippet.authorProfileImageUrl,
        likes: item.snippet.topLevelComment.snippet.likeCount,
        publishedAt: item.snippet.topLevelComment.snippet.publishedAt
      })
    });
  };

  const response = await axios.get(`/search?part=snippet&maxResults=25&regionCode=US&relatedToVideoId=${id}&type=video&key=${key}`);
  const relatedVideosWithoutStats = response.data;

  if(relatedVideosWithoutStats){
    relatedVideosWithoutStats.items.map((item: any) => {
     if(item.snippet){
      relatedWithoutStats.push({
        publishedAt: item.snippet.publishedAt,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        channelId: item.snippet.channelId,
        thumbnail: item.snippet.thumbnails.maxres ? item.snippet.thumbnails.maxres.url : item.snippet.thumbnails.high.url,
        videoId: item.id.videoId,
      })
      relatedVideoIds.push(item.id.videoId);
     }
    })
  }

  const responseF = await axios.get(`/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${relatedVideoIds}&maxResults=25&regionCode=US&key=${key}`);
  const relatedVideosWithStats = responseF.data;

  if(relatedVideosWithStats){
    relatedVideosWithStats.items.map((item: any) => {
      relatedWithStats.push({
        duration: item.contentDetails.duration,
        viewCount: item.statistics.viewCount,
        id: item.id
      })
    });
  };

  relatedWithoutStats.map((item: VideoWithoutStatistics) => {
    relatedWithStats.map((itemWithStatistics: VideoWithStatistics) => {
      if(item.videoId === itemWithStatistics.id){
        relatedVideos.push({
          publishedAt: item.publishedAt,
          channelId: item.channelId,
          title: item.title,
          thumbnail: item.thumbnail,
          channelTitle: item.channelTitle,
          viewCount: itemWithStatistics.viewCount,
          duration: itemWithStatistics.duration,
          videoId: item.videoId
        })
      };
    });
  });

  return {
    props: { 
      data: { video, channelData, comments, relatedVideos } 
    }
  }
};

interface Data {
  video: SingleVideo,
  channelData: ChannelData,
  comments: Comment[],
  relatedVideos: VideoCard[]
};

interface Props {
  data: Data
};

const DynamicVideoPage: NextPage<Props> = ({data}) => {
  return (
    <>
      <Meta title={data.video.title} />
      <VideoPage data={data} />
    </>
  )
};

export default DynamicVideoPage;
