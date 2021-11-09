import Moment from 'react-moment';
import moment from 'moment';

interface Props {
  duration: string
};

const Duration: React.FC<Props> = ({duration}) => {
  const durationToSeconds = moment.duration(duration.toString().padStart(4, '0:0')).asSeconds();
  const start = moment().add(-(durationToSeconds), 's');

  return <Moment date={start} format="h:mm:ss" trim durationFromNow />
};

export default Duration;
