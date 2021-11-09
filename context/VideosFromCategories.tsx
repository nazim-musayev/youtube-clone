import { ChannelData, VideoCard } from 'interfaces';
import { useContext, createContext, useReducer, Dispatch } from 'react';
import axios from 'axios';

type StateType = {
  videosFromCategories: VideoCard[],
  isFetching: boolean,
  selectedChip: number,
  initialChip: number | null
};
  
const initialState : StateType = {
  videosFromCategories: [],
  isFetching: false,
  selectedChip: 0,
  initialChip: 0
};

enum Actions {
  FETCH_VIDEOS_REQUEST = 'FETCH_VIDEOS_REQUEST',
  FETCH_VIDEOS_SUCCESS = 'FETCH_VIDEOS_SUCCESS'
};

interface Action {
  type: Actions,
  payload: {
    videos: VideoCard[],
    selectedChip: number,
    isFetching?: boolean
  }
};

export const fetchVideosRequest = (videos: VideoCard[], isFetching: boolean, selectedChip: number) => {
  return {
    type: Actions.FETCH_VIDEOS_REQUEST,
    payload: {
      videos,
      isFetching,
      selectedChip
    }
  }
};

export const fetchVideosSuccess = async (selectedChip: number) => {
  const key = process.env.NEXT_PUBLIC_API_KEY;
  const videosWithoutAvatars: VideoCard[] = [];
  const videosWithAvatars: VideoCard[] = [];
  const ids: string[] = [];
  const avatars: ChannelData[] = [];

  const r = await axios.get(`/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&videoCategoryId=${selectedChip}&regionCode=US&key=${key}`)
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
    })
  };

  const res = await axios.get(`/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${ids}&maxResults=50&key=${key}`)
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
        videosWithAvatars.push({
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
    })
  });
  
  return {
    type: Actions.FETCH_VIDEOS_SUCCESS,
    payload: {
      selectedChip,
      videos: videosWithAvatars
    }
  }
};


const StateContext = createContext<StateType>(initialState);
const DispatchContext = createContext<Dispatch<Action>>(Object);

const reducer = (state: StateType, {type, payload}: Action ) => {
  switch (type) {
    case Actions.FETCH_VIDEOS_REQUEST:
      return {
        ...state,
        videosFromCategories: payload.videos,
        selectedChip: payload.selectedChip,
        isFetching: payload.isFetching!,
        initialChip: payload.selectedChip === 0 ? 0 : null
      };
    case Actions.FETCH_VIDEOS_SUCCESS:
      return {
        selectedChip: payload.selectedChip,
        videosFromCategories: payload.videos,
        isFetching: false,
        initialChip: null 
      }
    default:
      return state
  }
};


export const VideosFromCategoriesProvider : React.FC<React.ReactNode> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
};

export const useVideosFromCategoriesState = () => useContext(StateContext);
export const useVideosFromCategoriesDispatch = () => useContext(DispatchContext);
