import React, {
  ComponentType,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import styles from "./NavBar.module.scss";
import Link from "next/link";
import { Menu, PersonSharp } from "@mui/icons-material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SignUpForm from "../SignUpForm/SignUpForm";

/**
 * Main navbar component for the site
 * @author ninjabattler
 */
const NavBar: ComponentType<{}> = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [showUserOptions, setShowUserOptions] = useState<boolean>(false);
  const [showSignupForm, setShowSignupForm] = useState<boolean>(false);
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      setOpen(false);
    });
  }, []);

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
    <header className={`${styles.navBar} ${open ? styles.fullscreen : ""}`}>
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
        <span>{data && data.user ? data.user.name : "Nobody"}</span>
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

      <nav className={styles.links}>
        <Link href={`/posts`}>Posts</Link>
        <Link href={`/articles`}>Articles</Link>
      </nav>

      <SignUpForm show={showSignupForm} />
    </header>
  );
};

export default NavBar;
