import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import DrawerIcon from 'components/DrawerIcon';
import DrawerContent from 'components/layout/Drawer';
import { useDrawerState, useDrawerDispatch, toggleTemporary } from 'context/Drawer';
import YoutubeIcon from 'components/YoutubeIcon';
import Link from 'next/link';
 
const TemporaryDrawer: React.FC = () => {
  const dispatch = useDrawerDispatch();
  const { temporary } = useDrawerState();

  return (
    <Drawer anchor='left' open={temporary} onClose={() => dispatch(toggleTemporary())}>
      <Stack direction='row' py={1} pl={2}>
        <DrawerIcon />
        <Link href='/' passHref>
          <Stack direction='row' pt='4px' pl={2} sx={{cursor: 'pointer'}}>
            <YoutubeIcon />
          </Stack>
        </Link>
      </Stack>
      <DrawerContent />
    </Drawer>
  )
};

export default TemporaryDrawer;
