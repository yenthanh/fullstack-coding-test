import Head from "next/head";
import styles from "../styles/Home.module.css";
import DynamicText from "components/DynamicText";
import { Input } from "@chakra-ui/react";
import { useRef } from "react";
import Nav from "components/Nav";

const Home = () => {
  type DynamicTextHandle = React.ElementRef<typeof DynamicText>;
  const ref = useRef<DynamicTextHandle>();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    (ref.current as any).changeValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coding Test</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className={styles.main} style={{maxWidth:"220px"}}>
        <DynamicText ref={ref} />
        <Input onChange={onChange} />
      </main>
    </div>
  );
};

export default Home;
