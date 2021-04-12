import React, { useState } from "react";
import { Form, Formik } from "formik";
import FormGroup from "components/formik/FormGroup";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import { Button, useToast, VStack } from "@chakra-ui/react";
import * as Yup from "yup";
import Link from "next/link";
import { useAuth } from "contexts/useAuth";
import { useRouter } from "next/router";
import { createUser } from "api";

const Signup = () => {
  const toast = useToast();
  const auth = useAuth();
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Signup</title>
      </Head>

      <main className={styles.main}>
        <Formik
          validationSchema={Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            passwordConfirm: Yup.string()
              .oneOf([Yup.ref("password"), null])
              .required("Password confirm is required"),
            name: Yup.string().min(4).max(50).required(),
          })}
          initialValues={{ email: "", password: "", name: ""}}
          onSubmit={async ({ email, password, name }) => {
            try {
              const user = await auth.signup(email, password);
              await createUser({
                name,
                uid: user.uid,
              });
              router.push("/");
            } catch (error) {
              toast({
                status: "success",
                title: "Welcome!",
              });
              router.push("/");
            }
          }}>
          {({ isSubmitting, setFieldValue }) => (
            <Form noValidate>
              <h1>Signup</h1>
              <VStack spacing="3" padding="3">
                <FormGroup id="name" name="name" label="Name" />
                <FormGroup id="email" name="email" type="email" label="Email" />
                <FormGroup id="password" name="password" type="password" label="Password" />
                <FormGroup id="passwordConfirm" name="passwordConfirm" type="password" label="Confirm Password" />

                <Button type="submit" isLoading={isSubmitting}>
                  Submit
                </Button>

                <Link href="/signin">Sign in</Link>
              </VStack>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default Signup;
