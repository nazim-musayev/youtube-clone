interface Props {
  id: string
};

const VideoPage: React.FC<Props> = ({id}) => {
  return (
    <iframe 
     width='100%' 
     height='500' 
     src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1&enablejsapi=1`} 
     title='YouTube video player' 
     frameBorder='0' 
     allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' 
     allowFullScreen
    ></iframe>
  )
};

export default VideoPage;