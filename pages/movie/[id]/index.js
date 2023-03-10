import axios from "axios";
import Image from "next/image";
import Meta from "../../../components/Meta";
import { useRouter } from "next/router";
import NotFound from "../../404";
import { useEffect, useState } from "react";

/* export async function getStaticPaths() {
  const res = await axios("https://api.cinerama.uz/api-test/movie-list");
  const movies = await res.data.data.movieList;
  const ids = movies.map((movie) => movie.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));
  return {
    paths,
    fallback: false,
  };
} */

/* export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await axios(
    `https://api.cinerama.uz/api-test/movie-detail?id=${id}`
  );
  const movie = res.data.data;
  return {
    props: { movie },
  };
} */

function Movie(/* { movie } */) {
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [countries, setCountries] = useState([]);
  const [employees, setEmployees] = useState([]);

  async function getData() {
    const res = await axios(
      `https://api.cinerama.uz/api-test/movie-detail?id=${router.query.id}`
    );
    const movies = res.data.data;
    const genres = movies.genres;
    const countries = movies.countries;
    const employees = movies.people[0].employees;

    setMovie(movies);
    setGenres(genres);
    setCountries(countries);
    setEmployees(employees);
  }

  useEffect(() => {
    getData();
  }, []);

  const router = useRouter();
  if (!router.isFallback && !movie) {
    return <NotFound statusCode={404} />;
  }

  return (
    <div className="container max-w-4xl mx-auto pt-6">
      <Meta title={movie.title} />
      <div className="px-3">
        {console.log(movie.title)}
        <Image
          src={movie.poster}
          width={700}
          height={450}
          className="rounded-md"
          alt={movie.title}
        />
        <h1 className="font-bold text-xl my-2">{movie.title}</h1>
        <p className="text-gray-600 text-sm mt-4">{movie.description}</p>
        <p className="mt-5 text-gray-600 text-sm">
          ??????????:{" "}
          <span className="font-bold">
            {genres.map((genre) => genre.title).join(", ")}
          </span>
        </p>
        <p className="mt-5 text-gray-600 text-sm">
          ????????????:{" "}
          <span className="font-bold">
            {countries.map((country) => country.title).join(", ")}
          </span>
        </p>
        <p className="text-gray-600 text-sm">
          ???????? ??????????????: <span className="font-bold">{movie.year}</span>
        </p>
      </div>
      <h1 className="text-center text-2xl font-bold my-5">??????????????</h1>
      <div>
        <iframe
          width="956"
          height="538"
          src="https://www.youtube.com/embed/Bnh5DaQsdkU"
          title="???????????????? ?? ??????????????: ?????????????????????? ???? ?????????????? ??????????-?????????????? ???? ?????????? 2023"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <h1 className="text-center text-2xl font-bold my-5">
        ?? ?????????? ??????????????????:
      </h1>
      <div className="row mt-5">
        {employees.map((e) => (
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
      </div>
    </div>
  );
}

export default Movie;
