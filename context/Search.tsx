import { useReducer, useContext, createContext, Dispatch } from 'react';

interface Tag {
  tag: string,
  id: string
};

type StateType = {
  searchedTags : Tag[],
  searchWord : string
};
  
const initialState = {
  searchedTags : [],
  searchWord : ''
};

enum SearchActions {
  SEARCH_TAG = 'SEARCH_TAG',
  CLEAR_INPUT = 'CLEAR_INPUT'
};

interface SearchAction {
  type : SearchActions,
  payload? : {
    searchedTags : Tag[],
    searchWord : string
  };
};

export const searchTag = (searchedTags: Tag[], searchWord: string) => {
  return {
    type : SearchActions.SEARCH_TAG,
    payload : { 
      searchedTags, 
      searchWord
    }
  }
};

export const clearInput = () => {
  return {
    type : SearchActions.CLEAR_INPUT
  }
};

const StateContext = createContext<StateType>(initialState);
const DispatchContext = createContext<Dispatch<SearchAction>>(Object);

const reducer = (state: StateType, {type, payload}: SearchAction ) => {
  switch (type) {
    case SearchActions.SEARCH_TAG:
      return {
        ...state,
        searchedTags : payload!.searchedTags,
        searchWord : payload!.searchWord,
      }
    case SearchActions.CLEAR_INPUT:
      return {
        searchWord : '',
        searchedTags : []
      }
    default:
      return state
  }
};

export const SearchProvider: React.FC<React.ReactNode> = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
};

export const useSearchState = () => useContext(StateContext);
export const useSearchDispatch = () => useContext(DispatchContext);
