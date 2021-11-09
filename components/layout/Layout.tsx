import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Header from 'components/layout/Header';
import SideBar from 'components/layout/SideBar';
import Drawer from 'components/layout/Drawer';
import TemporaryDrawer from 'components/layout/TemporaryDrawer';
import { useDrawerState } from 'context/Drawer';
import NextNProgress from "nextjs-progressbar";
import { useRouter } from 'next/router';


const Layout: React.FC<React.ReactNode> = ({children}) => {
  const { open } = useDrawerState();
  const { route } = useRouter();
  const selected: number = route.includes('explore') ? 1 : 0;

  return (
    <Paper square>
      <NextNProgress color='#ff0000' options={{ showSpinner: false }} />    
      <Header />
      {route.includes('watch') && <TemporaryDrawer />}
      {!route.includes('watch') && (
        <Stack position='fixed' top={50} left={0} bottom={0} bgcolor='secondary.main' height='100%'>
          {open ? <Drawer selected={selected} /> : <SideBar selected={selected} /> }
        </Stack>
      )}      
      <Stack bgcolor='secondary.dark'>
        {children}
      </Stack>
    </Paper>
  )
};

export default Layout;
