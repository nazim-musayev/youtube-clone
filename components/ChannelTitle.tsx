import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

interface Props {
  channelTitle: string
};

const ChannelTitle: React.FC<Props> = ({channelTitle}) => {
  return (
    <Tooltip placement='top-start' 
      title={
        <Typography fontSize='12px' py='4px'>
         {channelTitle}
        </Typography>
      }
    >
      <Typography variant='caption' color='grey.500' mr={1} sx={{'&:hover': {color: 'white'}}}>
        {`${channelTitle}`}
      </Typography>
    </Tooltip>
  )
};

export default ChannelTitle;
