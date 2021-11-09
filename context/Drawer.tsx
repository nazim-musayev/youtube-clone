import { useReducer, useContext, createContext, Dispatch } from 'react';
 
type StateType = {
  open: boolean,
  temporary: boolean
};
  
const initialState = {
  open: true,
  temporary: false
};

enum DrawerActions {
  TOGGLE_DRAWER = 'TOGGLE_DRAWER',
  TOGGLE_TEMPORARY = 'TOGGLE_TEMPORARY'
};

interface DrawerAction {
  type: DrawerActions
};

export const toggleDrawer = () => {
  return {
    type: DrawerActions.TOGGLE_DRAWER
  }
};

export const toggleTemporary = () => {
  return {
    type: DrawerActions.TOGGLE_TEMPORARY
  }
};

const StateContext = createContext<StateType>(initialState);
const DispatchContext = createContext<Dispatch<DrawerAction>>(Object);

const reducer = (state: StateType, {type} : DrawerAction ) => {
  switch (type) {
    case DrawerActions.TOGGLE_DRAWER:
      return {
        ...state,
        open: !state.open,
        temporary: state.temporary
      }
    case DrawerActions.TOGGLE_TEMPORARY:
      return {
        open: state.open,
        temporary: !state.temporary
      }
    default:
        return state
  }
};

export const DrawerProvider : React.FC<React.ReactNode> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
};

export const useDrawerState = () => useContext(StateContext);
export const useDrawerDispatch = () => useContext(DispatchContext);
