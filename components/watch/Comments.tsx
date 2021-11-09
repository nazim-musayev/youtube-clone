import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from 'components/Avatar';
import Moment from 'react-moment';
import Svg from 'components/Svg';
import { Comment } from 'interfaces';


interface Props {
  like: string,
  dislike: string,
  comments: Comment[]
};

const Comments: React.FC<Props> = ({like, dislike, comments})=> {
  const sortBy: string = 'M21,6H3V5h18V6z M15,11H3v1h12V11z M9,17H3v1h6V17z';

  return (
    <>
      <Stack py={2} direction='row' alignItems='center' spacing={2}>
        <Typography fontWeight={600} >
          25 Comments
        </Typography>
        <Button startIcon={<Svg d={sortBy} />}>
          Sort by
        </Button>
      </Stack>
      <Stack direction='row' spacing={2} mb={4}>
        <Avatar avatarUrl='https://yt3.ggpht.com/ytc/AKedOLTwMq-Iu0MIBRhH5h2w2wzPWqpc80xws_kb7qgXHQ=s88-c-k-c0x00ffffff-no-rj' width={36} height={36} />
        <Typography variant='body2' color='grey.500' borderBottom={1} borderColor='grey.800' width='100%'>
          Add a public comment...
        </Typography>
      </Stack>
      {comments.map(({text, name, avatarUrl, publishedAt, likes}) => (
        <Stack direction='row' spacing={2} key={publishedAt} mb={2}>
          <Avatar avatarUrl={avatarUrl} width={32} height={32} />
          <Stack>
            <Stack direction='row' spacing='4px' mb={1}>
              <Typography variant='caption'>
                {name}
              </Typography>
              <Typography variant='caption' color='grey.500'>
                <Moment fromNow>
                  {publishedAt}
                </Moment>
              </Typography>
            </Stack>
            <Typography variant='body2'>
              {text}
            </Typography>
            <Stack direction='row' alignItems='center'>
              <Button size='small' startIcon={<Svg d={like} /> }>
                {likes}
              </Button>
              <Button size='small' startIcon={<Svg d={dislike} /> }>
              </Button>
              <Typography variant='caption' color='grey.500'>
                REPLY
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </>
  )
};

export default Comments;
