import { useState } from 'react';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Svg from 'components/Svg';
import { Nav } from 'interfaces';
import { useRouter } from 'next/router';


interface StyledTabsProps {
  children?: React.ReactNode;
  value: number
};
    
const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
  display: 'none'
  },
  '& .MuiTab-labelIcon' : {
    color: '#858484',
    fontSize: '10px',
    fontFamily: 'sans-serif',
    textTransform: 'capitalize',
    '&.Mui-selected': {
      color: 'white'
    },
    '&:hover': {
      color: 'white',
      backgroundColor: 'rgba(102,102,102,1)'
    },
  },
  '& .MuiButtonBase-root.MuiTab-root' : {
    lineHeight: 3,
    minWidth: '72px',
  }
});


export const tabs: Array<Nav> = [
  {
    d: 'M12,4.33l7,6.12V20H15V14H9v6H5V10.45l7-6.12M12,3,4,10V21h6V15h4v6h6V10L12,3Z',
    d2: 'M4,10V21h6V15h4v6h6V10L12,3Z',
    label: 'Home'
  },
  {
    d: 'M9.8,9.8l-3.83,8.23l8.23-3.83l3.83-8.23L9.8,9.8z M13.08,12.77c-0.21,0.29-0.51,0.48-0.86,0.54 c-0.07,0.01-0.15,0.02-0.22,0.02c-0.28,0-0.54-0.08-0.77-0.25c-0.29-0.21-0.48-0.51-0.54-0.86c-0.06-0.35,0.02-0.71,0.23-0.99 c0.21-0.29,0.51-0.48,0.86-0.54c0.35-0.06,0.7,0.02,0.99,0.23c0.29,0.21,0.48,0.51,0.54,0.86C13.37,12.13,13.29,12.48,13.08,12.77z M12,3c4.96,0,9,4.04,9,9s-4.04,9-9,9s-9-4.04-9-9S7.04,3,12,3 M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2 L12,2z',
    d2: 'M11.23,13.08c-0.29-0.21-0.48-0.51-0.54-0.86c-0.06-0.35,0.02-0.71,0.23-0.99c0.21-0.29,0.51-0.48,0.86-0.54 c0.35-0.06,0.7,0.02,0.99,0.23c0.29,0.21,0.48,0.51,0.54,0.86c0.06,0.35-0.02,0.71-0.23,0.99c-0.21,0.29-0.51,0.48-0.86,0.54 c-0.07,0.01-0.15,0.02-0.22,0.02C11.72,13.33,11.45,13.25,11.23,13.08z M22,12c0,5.52-4.48,10-10,10S2,17.52,2,12 C2,6.48,6.48,2,12,2S22,6.48,22,12z M18.03,5.97L9.8,9.8l-3.83,8.23l8.23-3.83L18.03,5.97z',
    label: 'Explore'
  },
  {
    d: 'M10,18v-6l5,3L10,18z M17,3H7v1h10V3z M20,6H4v1h16V6z M22,9H2v12h20V9z M3,10h18v10H3V10z',
    d2: 'M20,7H4V6h16V7z M22,9v12H2V9H22z M15,15l-5-3v6L15,15z M17,3H7v1h10V3z',
    label: 'Subscriptions'
  },
  {
    d: 'M11,7l6,3.5L11,14V7L11,7z M18,20H4V6H3v15h15V20z M21,18H6V3h15V18z M7,17h13V4H7V17z',
    d2: 'M4,20h14v1H3V6h1V20z M21,3v15H6V3H21z M17,10.5L11,7v7L17,10.5z',
    label: 'Library'
  }
];

interface Props {
  selected: number
}

const SideBar: React.FC<Props> = ({selected}) => {
  const [selectedTab, setSelectedTab] = useState<number>(selected);
  const router = useRouter();
  
  const handleClick = (index: number) => {
    index === 0 && router.push('/');
    index === 1 && router.push('/explore');
    setSelectedTab(index);
  };

  return (
    <Stack width='72px' height='100vh' pt={2}>
      <StyledTabs value={selectedTab} orientation='vertical'>
        {tabs.map(({d,d2,label}, index) => (
          <Tab key={label} label={label} onClick={() => handleClick(index)}
           icon={<Svg d={selectedTab === index ? d2! : d} />}
          />
        ))}
      </StyledTabs>
    </Stack>
  );
};

export default SideBar
