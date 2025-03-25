export default async function userLogin(
  userEmail: string,
  userPassword: string
) {
  const response = await fetch("http://localhost:5000/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data?.msg || "Fail to log-in");
  }

  const data = await response.json();

  // get user info after login
  const profileRes = await fetch("http://localhost:5000/api/v1/auth/me", {
    headers: {
      Authorization: `Bearer ${data.token}`,
    },
  });

  const profile = await profileRes.json();

  return {
    token: data.token,
    user: profile.data,
  };
}
