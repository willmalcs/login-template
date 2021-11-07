import { NavBar } from "../components/NavBar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useBooksQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = useBooksQuery();
  return (
    <>
      <NavBar />
      <div>hello world</div>
      <br />
      {!data ? (
        <div>Loading...</div>
      ) : (
        data.books.map((b) => <div key={b.id}>{b.title}</div>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
