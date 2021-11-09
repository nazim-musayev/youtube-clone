import Avatar from '@mui/material/Avatar';

interface Props {
  avatarUrl: string,
  width: number,
  height: number
};

const ChannelAvatar: React.FC<Props> = ({avatarUrl, width, height}) => {
  return <Avatar alt='Avatar' src={avatarUrl} sx={{width, height}} />
};

export default ChannelAvatar;
