import Icon from '@mui/material/Icon';
import Typography from '@mui/material/Typography';
import { BsYoutube } from 'react-icons/bs';

const YoutubeIcon: React.FC = () => {
  return (
    <>
      <Icon color='error' sx={{fontSize: '28px'}}>
        <BsYoutube />
      </Icon>
      <Typography fontSize='18px' fontWeight={700} color='primary' letterSpacing={0} pt='3px'>
        YouTube
      </Typography>
    </>
  )
};

export default YoutubeIcon;
