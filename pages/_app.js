import Layout from "../components/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      {/* <div className="row mt-5">
        {movie.people[0].employees.map((e) => (
          <div className="col-md-2 mt-4" key={e.id}>
            <div className="px-3">
              <h3>{e.full_name}</h3>
              <Image
                src={e.photo}
                width={300}
                height={300}
                className="rounded-md"
                alt={e.full_name}
              />
            </div>
          </div>
        ))}
      </div> */}
    </Layout>
  );
}

export default MyApp;
