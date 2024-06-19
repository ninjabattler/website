import React, { FC, FormEvent, useCallback, useState } from "react";
import styles from "./SignUpForm.module.scss";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { signUp } from "next-auth-sanity/client";
import axios from "axios";

type SignUpFormProps = {
  signup?: boolean;
  show: boolean;
};

/**
 * A form used to sign up/log into an account
 * @author Ninjabattler
 */
const SignUpForm: FC<SignUpFormProps> = ({ signup, show }) => {
  const [signupForm, setSignupForm] = useState<boolean>(signup || false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [retypePassword, setRetypePassword] = useState<string>("");
  const router = useRouter();

  const newUser = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (name && email && password && retypePassword) {
        const newUser = await signUp({
          email,
          password,
          name,
        });

        await axios({
          method: "post",
          url: `/api/sanity/userDetails/create`,
          data: { userId: newUser.id, username: newUser.name },
          headers: { "Content-Type": "application/json" },
        });

        await signIn("sanity-login", {
          redirect: false,
          email,
          password,
        });

        router.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logIn = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (email && password) {
        await signIn("sanity-login", {
          redirect: false,
          email,
          password,
        });

        router.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`${styles.signUpForm} ${show ? styles.show : ""}`}>
      <form className={styles.signup} onSubmit={signupForm ? newUser : logIn}>
        {signupForm && (
          <>
            <span>Username</span>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </>
        )}

        <span>Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />

        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />

        {signupForm && (
          <>
            <span>Re-Type Password</span>
            <input
              type="password"
              value={retypePassword}
              onChange={(e) => {
                setRetypePassword(e.target.value);
              }}
            />
          </>
        )}

        <button
          type="submit"
          disabled={
            signupForm
              ? !name || !email || !password || !retypePassword
              : !email || !password
          }
        >
          {signupForm ? "Sign Up" : "Login"}
        </button>
      </form>

      <span className={styles.bottomMessage}>
        {signupForm ? (
          <em>
            Already have an account?{" "}
            <button
              onClick={() => {
                setSignupForm(false);
              }}
            >
              <u>Login</u>
            </button>
          </em>
        ) : (
          <em>
            Don&apos;t have an account?{" "}
            <button
              onClick={() => {
                setSignupForm(true);
              }}
            >
              <u>Sign Up</u>
            </button>
          </em>
        )}
      </span>
    </div>
  );
};

export default SignUpForm;
