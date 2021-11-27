import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSearchState, useSearchDispatch, searchTag, clearInput } from 'context/Search';
import { useRef, useImperativeHandle, forwardRef } from 'react';
import { ArrowHandle } from 'interfaces';
import { useRouter } from 'next/router';


const StyledList = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItem-root': {
    padding: 0,
    textTransform: 'lowercase'
  }
});

interface Props {
  focusOnInput: () => void
};

const SearchPortal = forwardRef<ArrowHandle, Props>(({focusOnInput}, ref) => {
  const { searchedTags } = useSearchState();
  const dispatch = useSearchDispatch();
  const router = useRouter();
  const listRef = useRef<HTMLElement>(null);

  useImperativeHandle(ref, () => { 
    const listArray = Array.from(listRef.current!.children);
    const lastItemIndex = listArray.length - 1;
    
    return ({
      down(inputIsFocused){
        const activeIndex = listArray.findIndex(item => item.querySelector('div')! === document.activeElement) + 1;
        activeIndex > lastItemIndex ? focusOnInput() : listArray[inputIsFocused ? 0 : activeIndex].querySelector('div')!.focus();
      },
      up(inputIsFocused){
        const activeIndex = listArray.findIndex(item => item.querySelector('div')! === document.activeElement);
        activeIndex === 0 ? focusOnInput() : listArray[inputIsFocused ? lastItemIndex : activeIndex - 1].querySelector('div')!.focus();
      }
    });
  });

  const handleListKeyDown = (event: React.KeyboardEvent<HTMLLIElement>, tag: string) => {
    if(event.code === 'Enter'){
      dispatch(searchTag([], tag));
      router.push(`/search/${tag}`);
    };
    if(event.code === 'Escape'){
      dispatch(clearInput());
    };
  };

  return (
    <StyledList ref={listRef}>
      {searchedTags.slice(0,10).map(({id, tag}) => (
        <ListItem disablePadding key={id} 
         onClick={() => {
           dispatch(searchTag([], tag));
           router.push(`/search/${tag}`);
         }}
         onKeyDown={(e) => handleListKeyDown(e,tag)}
        >
          <ListItemButton>
            <ListItemText primary={tag} />
          </ListItemButton>
        </ListItem>
      ))}
    </StyledList>
  )
});

export default SearchPortal;
