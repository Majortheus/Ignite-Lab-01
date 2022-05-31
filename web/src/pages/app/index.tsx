import { getSession, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0";
import { GetServerSideProps } from "next";

export default function Home({ accessToken }: { accessToken: string }) {
  const { user } = useUser();

  return (
    <div>
      <h1>Hello World</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <pre>{accessToken}</pre>
      <a href="/api/auth/logout" alt="logout">
        Logout
      </a>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = getSession(ctx.req, ctx.res);
  console.log({ session });
  return {
    props: {
      accessToken: session?.accessToken,
    },
  };
};
// withPageAuthRequired();
