import Head from 'next/head';

interface Props {
  title?: string,
  keywords?: string, 
  description?: string
};

const Meta: React.FC<Props> = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta charSet='utf-8' />
      <title>{title}</title>
    </Head>
  )
};

Meta.defaultProps = {
  title: 'Youtube',
  keywords: 'youtube, youtube videos, music, sports, funny videos, tiktok videos, cats, dogs, pets',
  description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum autem dolore laboriosam quae possimus. Totam necessitatibus, fuga dolor sunt, est nam sapiente iusto deleniti tempora reiciendis labore nobis vel unde.', 
};

export default Meta;
