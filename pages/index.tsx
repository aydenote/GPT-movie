import Head from 'next/head';
import Intro from '../components/intro';

export default function Home() {
  return (
    <>
      <Head>
        <title>지교수의 시네마</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Intro />
    </>
  );
}
