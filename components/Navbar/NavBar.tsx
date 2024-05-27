import React, { ComponentType, FormEvent, useCallback, useState } from "react";
import styles from "./NavBar.module.scss";
import Link from "next/link";
import { Menu, PersonSharp } from "@mui/icons-material";
import { signUp } from "next-auth-sanity/client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SignUpForm from "../SignUpForm/SignUpForm";

type NavBarProps = {
  setLinkClicked: Function;
  isArticlePage: Boolean;
};

/**
 * Main navbar component for the site
 * @author ninjabattler
 * @prop setLinkClicked Function
 */
const NavBar: ComponentType<NavBarProps> = ({
  setLinkClicked,
  isArticlePage,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showUserOptions, setShowUserOptions] = useState<boolean>(false);
  const [showSignupForm, setShowSignupForm] = useState<boolean>(false);
  const { data, status } = useSession();
  const router = useRouter();

  const logOut = useCallback(async (e: FormEvent) => {
    e.preventDefault();

    await signOut({
      redirect: false,
    });

    router.reload();
  }, []);

  const openMenu = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <div
      className={`${styles.navBar} ${isArticlePage ? styles.articlePage : ""} ${
        open ? styles.fullscreen : ""
      }`}
    >
      <div className={styles.navOptions}>
        <button onClick={openMenu}>
          <Menu />
        </button>
      </div>

      <div
        className={styles.account}
        onClick={() => {
          setShowUserOptions(!showUserOptions);
        }}
      >
        <PersonSharp />
        <span>{data ? data.user.name : "Nobody"}</span>
      </div>

      <div
        className={`${styles.userOptions} ${showUserOptions ? styles.show : ""}`}
      >
        {status === "authenticated" && <button onClick={logOut}>Logout</button>}
        {status === "unauthenticated" && (
          <button
            onClick={() => {
              setShowSignupForm(true);
            }}
          >
            Login
          </button>
        )}
      </div>

      <div className={styles.links}>
        <Link legacyBehavior href={`/posts`}>
          <a
            onClick={(e) => {
              e.preventDefault();
              setLinkClicked(`/posts`);
            }}
          >
            Posts
          </a>
        </Link>
        <Link legacyBehavior href={`/articles`}>
          <a
            onClick={(e) => {
              e.preventDefault();
              setLinkClicked(`/articles`);
            }}
          >
            Articles
          </a>
        </Link>
        <Link legacyBehavior href={`/about`}>
          <a
            onClick={(e) => {
              e.preventDefault();
              setLinkClicked(`/about`);
            }}
          >
            About
          </a>
        </Link>
      </div>

      <SignUpForm show={showSignupForm} />
    </div>
  );
};

export default NavBar;
