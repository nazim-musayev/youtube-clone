import { useVideosFromCategoriesState, useVideosFromCategoriesDispatch, fetchVideosRequest, fetchVideosSuccess } from 'context/VideosFromCategories';
import { useVideosFromAll } from 'context/VideosFromAll';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { Category } from 'interfaces';


const SubBar: React.FC = () => {
  const { selectedChip, videosFromCategories, initialChip } = useVideosFromCategoriesState();
  const dispatch = useVideosFromCategoriesDispatch();
  const { videos } = useVideosFromAll();

  const chips: Category[] = [
    {
      id: 0,
      title: 'All'
    },
    {
      id: 1,
      title: 'Film & Animation'
    },
    {
      id: 10,
      title: 'Music'
    },
    {
      id: 15,
      title: 'Pets & Animals'
    },
    {
      id: 17,
      title: 'Sports'
    },
    {
      id: 20,
      title: 'Gaming'
    },
    {
      id: 23,
      title: 'Comedy'
    },
    {
      id: 27,
      title: 'Education'
    },
    {
      id: 30,
      title: 'Movies'
    },
    {
      id: 37,
      title: 'Family'
    },
    {
      id: 43,
      title: 'Shows'
    }
  ];
 
  const handleClick = async (id: number) => {
    const fetchingFromServer = id > 0 ? true : false;
    if(selectedChip !== id){
      dispatch(fetchVideosRequest(initialChip === 0 ? videos : videosFromCategories, fetchingFromServer, id));
      if(id !== 0){
        dispatch(await fetchVideosSuccess(id));
      }
    }
  };

  return (
    <Stack pt={1.5} direction='row' justifyContent='space-around' bgcolor='secondary.main'
     borderBottom={1} borderTop={1} borderColor='grey.800' width='100%' height='60px'
    >
      {chips.map(({id, title}) => (
        <Chip key={id} label={title} variant='outlined' onClick={() => handleClick(id)}
         color={selectedChip === id ? 'primary' : 'secondary'}
         sx={{'&:hover': {
           backgroundColor: `${selectedChip === id ? '#fff' : '#4d4d4d'} !important`
         }}}
        />
      ))}
    </Stack>
  )
};

export default SubBar;
