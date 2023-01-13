import axios from "axios";
import Image from "next/image";
import Meta from "../../../components/Meta";
import { useRouter } from "next/router";
import NotFound from "../../404";

export async function getStaticPaths() {
  const res = await axios("https://api.cinerama.uz/api-test/movie-list");
  const movies = await res.data.data.movieList;

  const ids = await movies.map((movie) => movie.id);
  const paths = await ids.map((id) => ({ params: { id: id.toString() } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  const res = await axios(
    `https://api.cinerama.uz/api-test/movie-detail?id=${id}`
  );
  const movie = await res.data.data;

  return {
    props: { movie },
  };
}

const Movie = ({ movie = null }) => {
  const router = useRouter();
  if (!router.isFallback && !movie) {
    return <NotFound statusCode={404} />;
  }
  return (
    <div className="container max-w-4xl mx-auto pt-6">
      <Meta title={movie.title} />
      {console.log(movie)}
      <div className="px-3">
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
          Жанры:
          {/* <span className="font-bold">
            {movie.genres.map((genre) => genre.title).join(", ")}
          </span> */}
        </p>
        <p className="mt-5 text-gray-600 text-sm">
          Страны:{" "}
          {/* <span className="font-bold">
            {movie.countries.map((country) => country.title).join(", ")}
          </span> */}
        </p>
        <p className="text-gray-600 text-sm">
          Дата выпуска: <span className="font-bold">{movie.year}</span>
        </p>
      </div>
      <h1 className="text-center text-2xl font-bold my-5">Трейлер</h1>
      <div>
        <iframe
          width="956"
          height="538"
          src="https://www.youtube.com/embed/Bnh5DaQsdkU"
          title="Астерикс и Обеликс: Поднебесная 😎 Русский тизер-трейлер 😎 Фильм 2023"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
      <h1 className="text-center text-2xl font-bold my-5">
        В ролях снимались:
      </h1>
    </div>
  );
};

export default Movie;
