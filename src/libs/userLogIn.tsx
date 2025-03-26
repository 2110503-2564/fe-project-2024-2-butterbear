export default async function userLogin(
  userEmail: string,
  userPassword: string
) {
  const response = await fetch("https://2110503-backend-project-sable.vercel.app//api/v1/auth/login", {
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
  const profileRes = await fetch("https://2110503-backend-project-sable.vercel.app//api/v1/auth/me", {
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
