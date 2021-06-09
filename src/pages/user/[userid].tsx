import { useRouter } from 'next/router';
import Link from 'next/link';

import { VisuallyHidden } from '@reach/visually-hidden';
import { useUserData } from '../../hooks/useUserData';

import styles from '../../styles/pages/[userid].module.scss';
import { Star } from '../../components/icons/Star';
import { Fork } from '../../components/icons/Fork';
import { Code } from '../../components/icons/Code';
import { ArrowLeft } from '../../components/icons/ArrowLeft';

export default function UserId() {
  const { query: { userid } } = useRouter();
  const { data, error, loading } = useUserData(userid as string);

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <h1>Unable to find this user :(</h1>
        <Link href="/">
          <a>Try to search for another user</a>
        </Link>

      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        Loading...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link href="/">
          <a><ArrowLeft />  Voltar</a>
        </Link>

        <figure>
          <img className={styles.avatar} alt={data.name} src={data.avatarUrl} />
        </figure>
        <h1>{data.name}</h1>
        <p>
          <a href={`https://github.com/${data.login}`}>/{data.login}</a>
        </p>
        <p>Followers: {data.followers}</p>
        <p>Following: {data.following}</p>
        <p>Twitter: <a href={`https://twitter.com/${data.twitterUsername}`}>@{data.twitterUsername}</a></p>

        <h3>Organizations</h3>
        <ul>
          {data.organizations.map((organization) => (
            <li id={organization.name}>
              <a href={organization.url}>
                <img src={organization.avatarUrl} alt={organization.name} />
                <span>{organization.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.right}>
        {data.topRepositories.map((topRepository) => (
          <div key={topRepository.name}>
            <h2>
              <a href={topRepository.url}>
                {topRepository.name}
              </a>
            </h2>
            <p>{topRepository.description}</p>
            <p>
              <span>
                <Code /> <VisuallyHidden>Primary language:</VisuallyHidden> {topRepository.primaryLanguage.name}
              </span>
              <span>
                <Fork /> <VisuallyHidden>Forks:</VisuallyHidden> {topRepository.forkCount}
              </span>
              <span>
                <Star /> <VisuallyHidden>Stars:</VisuallyHidden> {topRepository.stargazerCount}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
