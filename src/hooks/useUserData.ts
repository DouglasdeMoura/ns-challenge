import { useEffect, useState } from 'react';
import useSWR from 'swr';

import { api } from '../services/api';
import { UserData } from '../api/services/GithubService/types';

const fetcher = (url) => api.get<UserData>(url).then((res) => res.data);

export function useUserData(userid: string) {
  const [loading, setLoading] = useState(true);
  const { data, error } = useSWR<UserData>(`/api/users/${userid}`, fetcher);

  useEffect(() => {
    if (data) setLoading(false);
  }, [data]);

  return { data, error, loading };
}
