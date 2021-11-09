import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSearchState, useSearchDispatch, searchTag } from 'context/Search';
import { useRouter } from 'next/router';


const StyledList = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItem-root': {
    padding: 0,
    textTransform: 'lowercase'
  }
});

const SearchPortal: React.FC = () => {
  const { searchedTags } = useSearchState();
  const dispatch = useSearchDispatch();
  const router = useRouter();

  return (
    <StyledList>
      {searchedTags.slice(0,10).map(({id, tag}) => (
        <ListItem disablePadding key={id} 
         onClick={() => {
           dispatch(searchTag([], tag));
           router.push(`/search/${tag}`);
         }}
        >
          <ListItemButton>
            <ListItemText primary={tag} />
          </ListItemButton>
        </ListItem>
      ))}
    </StyledList>
  )
};

export default SearchPortal;
