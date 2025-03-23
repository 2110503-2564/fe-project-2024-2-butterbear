export default async function userLogin(
  userEmail: String,
  userPassword: String
) {
  const response = await fetch(
    "https://a08-venue-explorer-backend-2.vercel.app/api/v1/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Fail to log-in");
  }
  return await response.json();
}
