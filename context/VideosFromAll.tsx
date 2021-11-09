import { ChannelData, VideoCard, Tag} from 'interfaces';
import { useContext, createContext, useState, useEffect } from 'react';
import axios from 'axios';

type StateType = {
  videos: VideoCard[],
  tags: Tag[],
  loading: boolean
};
  
const initialState : StateType = {
  videos: [],
  tags: [],
  loading: true
};

const StateContext = createContext<StateType>(initialState);

export const VideosFromAllProvider : React.FC<React.ReactNode> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [videos, setVideos] = useState<VideoCard[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    (async () => {

      const key = process.env.NEXT_PUBLIC_API_KEY;
      const videosWithoutAvatars: VideoCard[] = [];
      const tagsFromVideos: Tag[] = [];
      const ids: string[] = [];
      const avatars: ChannelData[] = [];
      const finalData: VideoCard[] = [];
      const r = await axios.get(`/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&key=${key}`);
      const dataWithoutAvatars = r.data;

      if(dataWithoutAvatars){
        dataWithoutAvatars.items.map((item: any) => {
          videosWithoutAvatars.push({
            publishedAt: item.snippet.publishedAt,
            channelId: item.snippet.channelId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.maxres ? item.snippet.thumbnails.maxres.url : item.snippet.thumbnails.high.url,
            channelTitle: item.snippet.channelTitle,
            viewCount: item.statistics.viewCount,
            duration: item.contentDetails.duration,
            videoId: item.id,
          });
          ids.push(item.snippet.channelId);
          if(item.snippet.tags){
            item.snippet.tags.map((tagItem: string, index: number) => {
              tagsFromVideos.push({
                tag: tagItem,
                id: `${tagItem}${index}`
              })
            })
          }
          setTags(tagsFromVideos);
        });
      };

      const res = await axios.get(`/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${ids}&maxResults=50&key=${key}`);
      const dataWithAvatars = res.data;

      if(dataWithAvatars){
        dataWithAvatars.items.map((item: any) => {
          avatars.push({
            avatarUrl: item.snippet.thumbnails.default.url,
            id: item.id
          })
        })
      };

      videosWithoutAvatars.map((item: VideoCard) => {
        avatars.map((itemWithAvatar: ChannelData) => {
          if(item.channelId === itemWithAvatar.id){
            finalData.push({
              publishedAt: item.publishedAt,
              channelId: item.channelId,
              title: item.title,
              thumbnail: item.thumbnail,
              channelTitle: item.channelTitle,
              viewCount: item.viewCount,
              duration: item.duration,
              videoId: item.videoId,
              avatarUrl: itemWithAvatar.avatarUrl
            })
          }
        });
      });

      setVideos(finalData);
      setLoading(false); 
    })();

  }, [])
 
  const value = { videos, tags, loading};

  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  )
};

export const useVideosFromAll = () => useContext(StateContext);
