import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Skeleton from '@mui/material/Skeleton';
import Avatar from 'components/Avatar';
import { Subscription } from 'interfaces';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Subscriptions: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const key = process.env.NEXT_PUBLIC_API_KEY;
      const mySubscriptions: Subscription[] = [];
      const res = await axios.get(`/subscriptions?part=snippet%2CcontentDetails&channelId=UCEUI2CXTVQv06H9cMcoJEkw&maxResults=50&key=${key}`);
      const data = res.data;

      data.items.map((item: any) => {
        mySubscriptions.push({
          title: item.snippet.title,
          channelId: item.snippet.resourceId.channelId,
          avatarUrl: item.snippet.thumbnails.high.url
        })
      })

      setSubscriptions(mySubscriptions);
      setLoading(false);
    })();

  }, []);

  return (
    <>
      {loading && (
        <>
          {Array.from(new Array(10)).map((item, index) => (
            <ListItem key={`${item}${index}`}>
              <ListItemIcon>
                <Skeleton variant='circular' width={24} height={24} sx={{bgcolor: 'grey.300'}} />
              </ListItemIcon>
              <Skeleton width='60%' sx={{bgcolor: 'grey.300'}}/>
            </ListItem>
          ))}
        </>
      )}
      {!loading && subscriptions.map(({title, channelId, avatarUrl}) => (
        <Link key={title} href={`https://www.youtube.com/channel/${channelId}`} passHref>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Avatar avatarUrl={avatarUrl} width={24} height={24} /> 
              </ListItemIcon>
              <ListItemText primary={title.length > 18 ? (`${title.slice(0,15)}...`) : title } />
            </ListItemButton>
          </ListItem>
        </Link>
      ))}
    </>
  )
};

export default Subscriptions;
