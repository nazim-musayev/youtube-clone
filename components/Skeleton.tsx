import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

const HomePageSkeleton: React.FC = () => {
  return (
    <Grid container p={2} mt={3}>
      {Array.from(new Array(20)).map((item, index) => (
        <Grid lg={3} item key={`${item}${index}`} mb={5}>
          <Skeleton variant='rectangular' width={250} height={140} animation={false} />
          <Stack spacing={1} direction='row' p='4px'>
            <Skeleton variant='circular' width={36} height={36} animation={false} />
            <Stack>
              <Skeleton variant='text' width={200} animation={false} />
              <Skeleton variant='text' width={200} animation={false} />
            </Stack>
          </Stack>
        </Grid>
      ))}
    </Grid>
  )
};

export default HomePageSkeleton;
