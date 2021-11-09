import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Svg from 'components/Svg';
import { MdOutlineClear } from 'react-icons/md'
import { useSearchState, useSearchDispatch, searchTag, clearInput } from 'context/Search';
import { useVideosFromAll } from 'context/VideosFromAll';
import { ChangeEvent } from 'react';
import { Tag } from 'interfaces';
import { useRouter } from 'next/router';

const Input = styled(InputBase)({
  backgroundColor: '#121212',
  color: 'white',
  border: '1px solid #555555',
  width: '100%',
  borderRadius: '2px 2px 2px 0',
  paddingLeft: 12,
  '& ::placeholder': {
    fontFamily: 'sans-serif',
  }
});

const SearchBar: React.FC = () => {
  const searchIcon: string = 'M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z';
  const dispatch = useSearchDispatch();
  const { searchWord } = useSearchState();
  const { tags } = useVideosFromAll();
  const router = useRouter();

  const handleChange = (event : ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    let searchedTags: Tag[] = [];
    tags.filter(({tag, id}) => tag.toLowerCase().includes(searchWord.toLowerCase()) && searchedTags.push({tag, id}));
    dispatch(searchTag(searchedTags, searchWord));
  };

  return (
    <>
      <Input placeholder='Search' onChange={handleChange} value={searchWord}
       endAdornment={
        searchWord && (
         <IconButton color='primary' sx={{fontSize: '22px'}} 
          onClick={() => dispatch(clearInput())}
         >
           <MdOutlineClear />
         </IconButton> 
        )
       }
      />
      <Stack bgcolor='grey.800' width='75px' mr={1}>
        <IconButton onClick={() => router.push(`/search/${searchWord}`)}>
          <Svg d={searchIcon} />
        </IconButton> 
      </Stack> 
   </>
  )
};

export default SearchBar;
