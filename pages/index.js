import Head from 'next/head'
import styles from '../styles/Home.module.css'

const YOUTUBE_PLAYLIST_ITEMS_API = 'https://www.googleapis.com/youtube/v3/playlistItems';

export async function getServerSideProps() {
  const res = await fetch(`${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLTjRvDozrdlxEIuOBZkMAK5uiqp8rHUax&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`);
  const data = await res.json();
  // part=snippet&playlistId=PLTjRvDozrdlxEIuOBZkMAK5uiqp8rHUax

  return {
    props: {
      data
    }
  }
}

export default function Home({ data }) {
  return (
    <div className={styles.container}>{console.log(data)}
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Youtube Playlist
        </h1>

        <ul className={styles.grid}>
          { 
          data.items.map(item => {
              const { id, snippet = {} } = item;              
              const { title, thumbnails = {}, resourceId } = snippet;
              const { medium = {}} = thumbnails;

              return (
                <li key={id} className={styles.card}>
                  <a href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}>
                    <p>
                      <img width={medium.width} src={medium.url} alt={title}/>
                    </p>
                    <h3>{title}</h3>
                  </a>
                </li>          
              )
            })
          }          
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
