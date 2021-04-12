import Head from "next/head";
import React, { useEffect, useRef } from "react";
import styles from "../styles/Home.module.css";
import firebase from "firebase";
import { useImmer } from "use-immer";
import _ from "lodash";
import { SimpleGrid, GridItem } from "@chakra-ui/react";
import PostModal, { PostModalHandle } from "components/PostModal";
import Nav from "components/Nav";
import { Post } from "api";

const Blog = () => {
  const [posts, setPosts] = useImmer({
    allIds: [] as string[],
    byId: {} as { [k: string]: Post },
  });

  const postModal = useRef<PostModalHandle>();

  useEffect(() => {
    // read posts realtime
    const unsubscribe = firebase
      .firestore()
      .collection("posts")
      .onSnapshot((snapshot) => {
        const allPosts = snapshot.docs.map((d) => ({ ...d.data(), id: d.id }));

        setPosts((draft) => {
          draft.byId = _.keyBy(allPosts, "id");
          draft.allIds = allPosts.map((p) => p.id);
        });
      });

    return () => unsubscribe();
  }, []);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav />

      <main className={styles.main}>
        <SimpleGrid columns={4}>
          {posts.allIds.map((id) => {
            const post = posts.byId[id];

            return (
              <GridItem
                key={id}
                onClick={() => {
                  const modal = postModal.current;
                  modal.setPost(post);
                  modal.open();
                }}>
                <div className={styles.grid}>
                  <div className={styles.card}>
                    <h3>{post.title}</h3>
                    <img
                      src={post.image ? post.image : "https://via.placeholder.com/300"}
                      width="300"
                      alt="Post image"
                    />
                  </div>
                </div>
              </GridItem>
            );
          })}
        </SimpleGrid>

        <PostModal ref={postModal} />
      </main>
    </div>
  );
};

export default Blog;