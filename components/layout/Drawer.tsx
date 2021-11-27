import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Subscriptions from 'components/Subscriptions';
import Svg from 'components/Svg';
import { tabs } from 'components/layout/SideBar';
import { Nav } from 'interfaces';
import { useState } from 'react';
import { useRouter } from 'next/router';


const StyledStack = styled(Stack)({
  overflowY: 'scroll',
  '&::-webkit-scrollbar': {
    width: '8px',
    backgroundColor: '#252525'
   },
   '&::-webkit-scrollbar-track': {
     borderRadius: '5px',
     boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.25)'
   },
   '&::-webkit-scrollbar-thumb': {
     borderRadius: '5px',
     backgroundColor: '#868686',
     marginTop: "20px"
   }
});

const StyledList = styled(List)<{ component?: React.ElementType }>({
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
    paddingBottom: 3
  },
  '& .MuiListItem-root': {
    '&:hover': {
      backgroundColor: '#383838'
    },
    '&:selected': {
      backgroundColor: '#383838' 
    }
  },
  '& .MuiListItemText-primary': {
    fontSize: 14,
    paddingLeft: 8
  },
  '& .MuiListItemButton-divider': {
    borderColor: 'rgba(102,102,102,1)',
  }
});

interface Props {
  selected?: number
};

const Drawer: React.FC<Props> = ({selected}) => {
  const [selectedNav, setSelectedNav] = useState<number>(selected!);
  const router = useRouter();
  const navs = tabs.filter(item => item.label !== 'Library');
  const navsTwo: Nav[] = [
    {
      d: 'M11,7l6,3.5L11,14V7L11,7z M18,20H4V6H3v15h15V20z M21,18H6V3h15V18z M7,17h13V4H7V17z',
      label: 'Library'
    },
    {
      d: 'M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M22,12c0,5.51-4.49,10-10,10S2,17.51,2,12h1c0,4.96,4.04,9,9,9 s9-4.04,9-9s-4.04-9-9-9C8.81,3,5.92,4.64,4.28,7.38C4.17,7.56,4.06,7.75,3.97,7.94C3.96,7.96,3.95,7.98,3.94,8H8v1H1.96V3h1v4.74 C3,7.65,3.03,7.57,3.07,7.49C3.18,7.27,3.3,7.07,3.42,6.86C5.22,3.86,8.51,2,12,2C17.51,2,22,6.49,22,12z',
      label: 'History'
    },
    {
      d: 'M10,8l6,4l-6,4V8L10,8z M21,3v18H3V3H21z M20,4H4v16h16V4z',
      label: 'Your Videos'
    },
    {
      d: 'M14.97,16.95L10,13.87V7h2v5.76l4.03,2.49L14.97,16.95z M12,3c-4.96,0-9,4.04-9,9s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z',
      label: 'Watch Later'
    },
    {
      d: 'M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z',
      label: 'Liked Videos'
    }
  ];

  const moreFromYoutube: Nav[] = [
    {
      d: 'M10,12H8v2H6v-2H4v-2h2V8h2v2h2V12z M17,12.5c0-0.83-0.67-1.5-1.5-1.5S14,11.67,14,12.5c0,0.83,0.67,1.5,1.5,1.5 S17,13.33,17,12.5z M20,9.5C20,8.67,19.33,8,18.5,8S17,8.67,17,9.5c0,0.83,0.67,1.5,1.5,1.5S20,10.33,20,9.5z M16.97,5.15l-4.5,2.53 l-0.49,0.27l-0.49-0.27l-4.5-2.53L3,7.39v6.43l8.98,5.04l8.98-5.04V7.39L16.97,5.15 M16.97,4l4.99,2.8v7.6L11.98,20L2,14.4V6.8 L6.99,4l4.99,2.8L16.97,4L16.97,4z',
      label: 'Gaming'
    },
    {
      d: 'M14,12c0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2S14,10.9,14,12z M8.48,8.45L7.77,7.75C6.68,8.83,6,10.34,6,12 s0.68,3.17,1.77,4.25l0.71-0.71C7.57,14.64,7,13.39,7,12S7.57,9.36,8.48,8.45z M16.23,7.75l-0.71,0.71C16.43,9.36,17,10.61,17,12 s-0.57,2.64-1.48,3.55l0.71,0.71C17.32,15.17,18,13.66,18,12S17.32,8.83,16.23,7.75z M5.65,5.63L4.95,4.92C3.13,6.73,2,9.24,2,12 s1.13,5.27,2.95,7.08l0.71-0.71C4.02,16.74,3,14.49,3,12S4.02,7.26,5.65,5.63z M19.05,4.92l-0.71,0.71C19.98,7.26,21,9.51,21,12 s-1.02,4.74-2.65,6.37l0.71,0.71C20.87,17.27,22,14.76,22,12S20.87,6.73,19.05,4.92z',
      label: 'Live'
    },
    {
      d: 'M17 3V5V6V10V10.51L16.99 10.97C16.94 13.1 15.66 14.94 13.74 15.67H13.72L13.66 15.69L13 15.95V16.65V19V20H14V21H15H10V20H11V19V16.65V15.95L10.34 15.71L10.26 15.68H10.25C8.33 14.95 7.05 13.11 7 10.98V10.51V10V6V5V3H17ZM18 2H6V5H4V6V10V11H6.01C6.07 13.53 7.63 15.78 9.97 16.64C9.98 16.64 9.99 16.64 10 16.65V19H9V20H8V22H16V20H15V19H14V16.65C14.01 16.65 14.02 16.65 14.03 16.64C16.36 15.78 17.93 13.54 17.99 11H20V10V6V5H18V2ZM18 10V6H19V10H18ZM5 10V6H6V10H5Z',
      label: 'Sport'
    },
    {
      d: 'M12,9c1.65,0,3,1.35,3,3s-1.35,3-3,3s-3-1.35-3-3S10.35,9,12,9 M12,8c-2.21,0-4,1.79-4,4s1.79,4,4,4s4-1.79,4-4 S14.21,8,12,8L12,8z M13.22,3l0.55,2.2l0.13,0.51l0.5,0.18c0.61,0.23,1.19,0.56,1.72,0.98l0.4,0.32l0.5-0.14l2.17-0.62l1.22,2.11 l-1.63,1.59l-0.37,0.36l0.08,0.51c0.05,0.32,0.08,0.64,0.08,0.98s-0.03,0.66-0.08,0.98l-0.08,0.51l0.37,0.36l1.63,1.59l-1.22,2.11 l-2.17-0.62l-0.5-0.14l-0.4,0.32c-0.53,0.43-1.11,0.76-1.72,0.98l-0.5,0.18l-0.13,0.51L13.22,21h-2.44l-0.55-2.2l-0.13-0.51 l-0.5-0.18C9,17.88,8.42,17.55,7.88,17.12l-0.4-0.32l-0.5,0.14l-2.17,0.62L3.6,15.44l1.63-1.59l0.37-0.36l-0.08-0.51 C5.47,12.66,5.44,12.33,5.44,12s0.03-0.66,0.08-0.98l0.08-0.51l-0.37-0.36L3.6,8.56l1.22-2.11l2.17,0.62l0.5,0.14l0.4-0.32 C8.42,6.45,9,6.12,9.61,5.9l0.5-0.18l0.13-0.51L10.78,3H13.22 M14,2h-4L9.26,4.96c-0.73,0.27-1.4,0.66-2,1.14L4.34,5.27l-2,3.46 l2.19,2.13C4.47,11.23,4.44,11.61,4.44,12s0.03,0.77,0.09,1.14l-2.19,2.13l2,3.46l2.92-0.83c0.6,0.48,1.27,0.87,2,1.14L10,22h4 l0.74-2.96c0.73-0.27,1.4-0.66,2-1.14l2.92,0.83l2-3.46l-2.19-2.13c0.06-0.37,0.09-0.75,0.09-1.14s-0.03-0.77-0.09-1.14l2.19-2.13 l-2-3.46L16.74,6.1c-0.6-0.48-1.27-0.87-2-1.14L14,2L14,2z',
      label: 'Settings'
    },
    {
      d: 'M13.18,4l0.24,1.2L13.58,6h0.82H19v7h-5.18l-0.24-1.2L13.42,11H12.6H6V4H13.18 M14,3H5v18h1v-9h6.6l0.4,2h7V5h-5.6L14,3 L14,3z',
      label: 'Report History'
    },
    {
      d: 'M15.36,9.96c0,1.09-0.67,1.67-1.31,2.24c-0.53,0.47-1.03,0.9-1.16,1.6L12.85,14h-1.75l0.03-0.28 c0.14-1.17,0.8-1.76,1.47-2.27c0.52-0.4,1.01-0.77,1.01-1.49c0-0.51-0.23-0.97-0.63-1.29c-0.4-0.31-0.92-0.42-1.42-0.29 c-0.59,0.15-1.05,0.67-1.19,1.34L10.32,10H8.57l0.06-0.42c0.2-1.4,1.15-2.53,2.42-2.87c1.05-0.29,2.14-0.08,2.98,0.57 C14.88,7.92,15.36,8.9,15.36,9.96z M12,18c0.55,0,1-0.45,1-1s-0.45-1-1-1s-1,0.45-1,1S11.45,18,12,18z M12,3c-4.96,0-9,4.04-9,9 s4.04,9,9,9s9-4.04,9-9S16.96,3,12,3 M12,2c5.52,0,10,4.48,10,10s-4.48,10-10,10S2,17.52,2,12S6.48,2,12,2L12,2z',
      label: 'Help'
    },
    {
      d: 'M13,14h-2v-2h2V14z M13,5h-2v6h2V5z M19,3H5v16.59l3.29-3.29L8.59,16H9h10V3 M20,2v15H9l-5,5V2H20L20,2z',
      label: 'Send Feedback'
    },
  ];

  const links = ['About', 'Press', 'Copyright', 'Contact us', 'Creator', 'Advertise', 'Developers'];
  const linksTwo = ['Terms', 'Privacy', 'Policy Safety', 'How Youtube Works', 'Test new features'];

  const handleClick = (index: number) => {
    index === 0 && router.push('/');
    index === 1 && router.push('/explore');
    setSelectedNav(index);
  };

  return (
    <StyledStack width='240px' px={1} pb={2} pt={2} height='100vh'>
      <StyledList disablePadding>
        {Array.from([...navs, ...navsTwo]).map(({label, d}, index) => (
          <ListItem key={label} disablePadding onClick={() => handleClick(index)} 
           sx={{marginBottom: label === 'Subscriptions' ? '16px' : 0}}
          >
            <ListItemButton selected={selectedNav === index} divider={label === 'Subscriptions'}>
              <ListItemIcon>
                <Svg d={d} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </StyledList>
      <Divider sx={{marginY: 2}} />
      <StyledList disablePadding>
        <Typography fontSize='14px' pl={2} variant='overline' color='grey.500'>
          Subscriptions
        </Typography>
        <Subscriptions />
      </StyledList>
      <Divider sx={{marginY: 2}} />
      <StyledList disablePadding>
        <Typography fontSize='14px' pl={2} variant='overline' color='grey.500'>
          More From Youtube
        </Typography>
        {moreFromYoutube.map(({label, d}, index) => (
          <ListItem key={label} disablePadding onClick={() => setSelectedNav(index + 8)} 
           sx={{marginBottom: label === 'Sport' ? '16px' : 0}}
          >
            <ListItemButton selected={selectedNav === index + 8} divider={label === 'Sport'}>
              <ListItemIcon>
                <Svg d={d} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </StyledList>
      <Divider sx={{marginY: 2}} />
      <Stack direction='row' spacing={1} flexWrap='wrap' pt={1} pl={2}>
        {links.map((item, index) => (
          <Typography key={index} fontSize='13px'>
            {item}
          </Typography>
        ))}
      </Stack>
      <Stack direction='row' spacing={1} flexWrap='wrap' pt={1} pl={2} mt={1}>
        {linksTwo.map((item, index) => (
          <Typography key={index} fontSize='13px'>
            {item}
          </Typography>
        ))}
      </Stack>
      <Typography fontSize='12px' color='grey.500' p={2}>
        {'©'} 2021 Google LLC
      </Typography>
    </StyledStack>
  )
};

export default Drawer;
