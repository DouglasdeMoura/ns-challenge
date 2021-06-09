import { useRef, useState } from 'react';
import { useRouter } from 'next/router';

import styles from '../styles/pages/index.module.scss';

export default function Index() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputDisabled, setInputDisabled] = useState(true);
  const router = useRouter();

  const handleOnSubmit = (event) => {
    event.preventDefault();
    router.push(`/user/${inputRef.current.value}`);
  };

  const handleOnChange = (event) => {
    if (event.currentTarget.value.length >= 3) {
      setInputDisabled(false);
    } else {
      setInputDisabled(true);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="username">Type your GitHub username:</label>
        <p className={styles.inputBlock}>
          <input id="username" ref={inputRef} onChange={handleOnChange} />
          <button type="submit" disabled={inputDisabled}>Search</button>
        </p>
      </form>
    </div>
  );
}
