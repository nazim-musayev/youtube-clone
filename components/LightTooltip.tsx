import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import Fade from '@mui/material/Fade';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#fff',
      color: 'rgba(0, 0, 0, 0.87)',
      fontSize: 11,
      fontFamily: 'sans-serif'
    },
});

interface Props {
  children: React.ReactNode,
  title: string,
  placement: string
};

const CustomTooltip: React.FC<Props> = ({children, title, placement}) => {
  return (
    <LightTooltip title={title} placement={placement}
     TransitionComponent={Fade}
     TransitionProps={{ timeout: 300 }}
    >
      {children}
    </LightTooltip>
  )
};

export default CustomTooltip;
