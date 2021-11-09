import IconButton from '@mui/material/IconButton';
import Svg from 'components/Svg';
import { useDrawerDispatch, toggleDrawer, toggleTemporary } from 'context/Drawer';
import { useRouter } from 'next/router';

const DrawerIcon: React.FC = () => {
  const drawerIcon: string = 'M21,6H3V5h18V6z M21,11H3v1h18V11z M21,17H3v1h18V17z';
  const dispatch = useDrawerDispatch();
  const { route } = useRouter();

  return (
    <IconButton onClick={() => dispatch(route.includes('watch') ? toggleTemporary() : toggleDrawer())}>
      <Svg d={drawerIcon} />
    </IconButton>
  )
};

export default DrawerIcon;
