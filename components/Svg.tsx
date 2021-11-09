import SvgIcon, {SvgIconProps} from '@mui/material/SvgIcon';

interface Props {
  d: string
};

const Svg: React.FC<Props> = ({d}, svgProps: SvgIconProps) => {
  return (
    <SvgIcon {...svgProps}>
      <path d={d} />
    </SvgIcon>
  )
};

export default Svg;
